upgrade: 
	yarn --cwd server upgrade
	yarn --cwd client upgrade

install:
	yarn --cwd server install
	yarn --cwd client install

runc:
	yarn --cwd client start:client
runs:
	yarn --cwd server start:server