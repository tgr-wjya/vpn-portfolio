# vpn-portfolio

personal wireguard vpn infrastructure deployed on aws using terraform

## ⚠️ important notice

this project is **not intended for public use**. it requires:
- active aws account with valid credentials
- terraform cli installed locally
- ssh key pair configuration
- understanding of cloud infrastructure costs

this is a learning/portfolio project. do not clone and run without understanding the infrastructure and associated aws costs.

## what this does

automated deployment of a wireguard vpn server on aws ec2 infrastructure. built to understand infrastructure-as-code principles and cloud networking fundamentals.

**key features:**
- automated ec2 instance provisioning
- wireguard vpn server setup
- security group configuration
- elastic ip allocation
- one-command deployment and teardown

## architecture

**infrastructure:** terraform · aws ec2 · elastic ip · security groups  
**vpn protocol:** wireguard  
**deployment:** powershell scripts  
**server os:** ubuntu 22.04 lts

## project structure

```
├── configs/          # ssh keys (gitignored)
├── scripts/          
│   ├── deploy.ps1    # automated deployment
│   └── setup.sh      # server configuration
└── terraform/        
    ├── main.tf       # infrastructure definition
    └── destroy.ps1   # cleanup script
```

## deployment

**prerequisites:**
- aws cli configured with valid credentials
- terraform installed
- ssh key pair generated in `configs/`

**deploy:**
```powershell
.\scripts\deploy.ps1
```

**destroy:**
```powershell
cd terraform
.\destroy.ps1
```

## learning outcomes

- infrastructure as code with terraform
- aws vpc and security group management
- wireguard vpn protocol configuration
- automated cloud provisioning workflows

---

**note:** all sensitive files (ssh keys, terraform state) are excluded from version control via .gitignore
