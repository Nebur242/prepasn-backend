
#!/bin/bash

dry_run_flag="false"
service=""
package="bash ./deploy.sh"

print_usage() {
  echo "Usage: $package -s service [options]"
  echo ""
  echo "Example: $package -s backend -d"
  echo "options:"
  echo "-d                dry-run"
}

while getopts "ds:" flag; do
  case "${flag}" in
    d) dry_run_flag="true" ;;
    s) service="${OPTARG}" ;;
    *) print_usage
       exit 1 ;;
  esac
done

if [ -z $service ]
then
  print_usage
  exit 1
fi

echo "Checking if $service is affected by a change..."
yarn nx affected:apps --plain | grep $service &> /dev/null

if [ $? -eq 1 ]; then
  echo "$service is not affected by a change."
  exit 0
fi

echo "Dry-run $dry_run_flag"
echo "Packaging $service application"
yarn sls package -c ./$service.serverless.ts --verbose

if [ $dry_run_flag -eq "true" ] then
  echo "Deploying $service application..."
  yarn sls deploy -c ./$service.serverless.ts -p .serverless --verbose
fi
