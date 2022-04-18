#!/bin/bash

branch_name=""
configuration="serverless"
package="bash ./build.sh"

print_usage() {
  echo "Usage: $package -b branch_name"
}

while getopts "db:s:" flag; do
  case "${flag}" in
    b) branch_name="${OPTARG}" ;;
    *) print_usage
       exit 1 ;;
  esac
done

if [ -z $branch_name ]; then
  print_usage
  exit 1
fi

echo "Building on branch $branch_name if affected by a change..."

if [ $branch_name = "main" ]
then
  yarn nx affected --base=origin/main~1 --head=origin/main --target=build --configuration=$configuration
else
  yarn nx affected --base=origin/$branch_name --head=origin/main --target=build --configuration=$configuration
fi
