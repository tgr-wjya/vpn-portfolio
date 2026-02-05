# vpn-portfolio

i over-engineered a private vpn because i don't trust anyone, including myself.

---

## what this is

automated deployment of a wireguard vpn server on aws ec2. i built this to prove i could handle infrastructure-as-code without accidentally bankrupting myself.

**disclaimer:** if you clone this and leave it running, jeff bezos will personally thank you for the donation. check the `terraform/` directory before you hit deploy.

## "features"

- **automated overkill:** ec2 provisioning that works 60% of the time, every time. it either work, or it doesn't
- **wireguard setup:** fast, modern, and makes me feel like a sysadmin.
- **the kill switch:** one-command teardown for when the aws bill gets scary.
- **security:** security groups tight to make this whole project secure.

## stack

**infra:** terraform · aws ec2 · vpc · elastic ip

**vpn:** wireguard (ubuntu 22.04 lts)

**glue:** powershell · bash · caffeine

## project structure

```
├── configs/          # ssh keys (gitignored for obvious reasons)
├── scripts/
│   ├── deploy.ps1    # the "mvp" button
│   └── setup.sh      # server configuration
└── terraform/
    ├── main.tf       # infrastructure definition
    └── destroy.ps1   # the "emergency stop" button

```

## how to use (at your own risk)

**prerequisites:**

- aws cli (configured with actual money in the account)
- terraform (installed and not broken)
- ssh key pair generated in `configs/`

**commands:**

```powershell
# step 1: deploy it if you will
.\scripts\deploy.ps1

# step 2: destroy before the billing cycle ends.
cd terraform
.\destroy.ps1

```

## learning outcomes

- terraform is great! don't let anyone tell you otherwise.
- networking is not that scary.
- automated workflows save lives, lifted my burden (and wallets).
- wow, this is truly over-engineering

---

made with ◉‿◉
