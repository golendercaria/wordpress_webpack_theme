.PHONY: help install import dbimport deploy mediadeploy mediaimport dbdeploy fulldeployement

serverpath=~/httpdocs/
ssh=webproof
domaindev=
domainprod=
phppath=/usr/bin/php


help: ## Affiche cette aide
    @grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install le package wp-cli
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    php wp-cli.phar --info

import: ## Importe les fichiers distants
    rsync -azv $(ssh):$(serverpath) ./ \
        --exclude wp-config.php \
        --exclude .htaccess \
        --exclude .git \
        
deploy: ## Déploie une nouvelle version de l'application
    rsync -azv ./ $(ssh):$(serverpath) \
        --exclude Makefile \
        --exclude wp-config.php \
        --exclude .htaccess \
        --exclude .git \
        --exclude .vscode \
    
mediadeploy: ## Déploie les media
    rsync -azv ./wp-content/uploads $(ssh):$(serverpath)wp-content/uploads

mediaimport: ## Importation des media
    rsync -azv $(ssh):$(serverpath)wp-content/uploads ./wp-content/uploads

dbdeploy: ## Migration de la DB dev vers db prod
    php wp-cli.phar db export --add-drop-table dump.sql
    rsync -azv ./dump.sql $(ssh):$(serverpath)
    ssh $(ssh) "cd $(serverpath); $(phppath) wp-cli.phar db import dump.sql; $(phppath) wp-cli.phar search-replace '$(domaindev)' '$(domainprod)'; rm dump.sql"
    rm dump.sql

dbimport: ## Migration de la DB prod vers la DB local
    ssh $(ssh) "cd $(serverpath); $(phppath) wp-cli.phar db export --add-drop-table dump.sql"
    rsync -av $(ssh):$(serverpath)dump.sql ./
    ssh $(ssh) "rm $(serverpath)dump.sql"
    php wp-cli.phar db import dump.sql
    php wp-cli.phar search-replace '$(domainprod)' '$(domaindev)'
    rm dump.sql

fulldeployment: ## Full deployment
    make deploy
    make dbdeploy

dbimportbackup: ## Backup la DB en ligne et la télécharge
    ssh $(ssh) "cd $(serverpath); $(phppath) wp-cli.phar db export --add-drop-table dump.sql"
    rsync -av $(ssh):$(serverpath)dump.sql ./
    ssh $(ssh) "rm $(serverpath)dump.sql"