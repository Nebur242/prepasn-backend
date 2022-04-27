#!/bin/bash

set -euo pipefail

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

echo "Building branch $branch_name if affected by a change..."

if [ $branch_name = "main" ]; then
  yarn nx affected --base=main~1 --head=main --target=build --configuration=$configuration --skip-nx-cache
elif [ $branch_name = "unstaged" ]; then
  yarn nx affected --target=build --configuration=$configuration --skip-nx-cache
else
  yarn nx affected --base=main --head=$branch_name --target=build --configuration=$configuration --skip-nx-cache
fi
