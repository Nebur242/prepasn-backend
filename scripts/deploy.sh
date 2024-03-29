#!/bin/bash

set -uo pipefail

dry_run_flag="false"
service=""
branch_name=""
package="bash ./deploy.sh"

print_usage() {
  echo "Usage: $package -s service -b branch_name [options]"
  echo ""
  echo "Example: $package -s backend -d"
  echo "options:"
  echo "-d                dry-run"
}

while getopts "db:s:" flag; do
  case "${flag}" in
    d) dry_run_flag="true" ;;
    b) branch_name="${OPTARG}" ;;
    s) service="${OPTARG}" ;;
    *) print_usage
       exit 1 ;;
  esac
done

if [ -z $service ] || [ -z $branch_name ]; then
  print_usage
  exit 1
fi

echo "Dry-run: $dry_run_flag"
echo "Checking if $service service is affected by a change on $branch_name branch..."

if [ $branch_name = "main" ]; then
  yarn nx affected:apps --base=main~1 --head=main --plain | grep $service &> /dev/null
elif [ $branch_name = "unstaged" ]; then
  yarn nx affected:apps --plain | grep $service &> /dev/null
else
  yarn nx affected:apps --base=main --head=$branch_name --plain | grep $service &> /dev/null
fi

if [ $? -eq 1 ]; then
  echo "$service is not affected by a change."
  exit 0
fi

if [ $dry_run_flag = "true" ]; then
  echo "Packaging $service application"
  yarn sls $service:package --verbose
else
  echo "Deploying $service application..."
  yarn sls deploy --service=$service --verbose
fi
