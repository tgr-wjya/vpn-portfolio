cd terraform
terraform init
terraform apply -auto-approve

Write-Host "VPN deployed. Waiting 60s for initialization..."
Start-Sleep -Seconds 60

$VPN_IP = terraform output -raw vpn_ip
Write-Host "VPN IP: $VPN_IP"
Write-Host "SSH: $(terraform output -raw ssh_command)"
