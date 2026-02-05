terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
}

resource "aws_security_group" "vpn" {
  name        = "wireguard-vpn"
  description = "WireGuard VPN access"

  ingress {
    from_port   = 51820
    to_port     = 51820
    protocol    = "udp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "vpn" {
  key_name   = "vpn-key"
  public_key = file("${path.module}/../configs/vpn-key.pub")
}

resource "aws_instance" "vpn" {
  ami           = "ami-0497a974f8d5dcef8"  # Ubuntu 22.04 LTS ap-southeast-1
  instance_type = "t3.micro"

  vpc_security_group_ids = [aws_security_group.vpn.id]
  key_name               = aws_key_pair.vpn.key_name

  user_data = file("${path.module}/../scripts/setup.sh")

  tags = {
    Name = "WireGuard-VPN"
  }
}

resource "aws_eip" "vpn" {
  instance = aws_instance.vpn.id
  domain   = "vpc"
}

output "vpn_ip" {
  value = aws_eip.vpn.public_ip
}

output "ssh_command" {
  value = "ssh -i configs/vpn-key ubuntu@${aws_eip.vpn.public_ip}"
}
