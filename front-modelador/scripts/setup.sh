rmnginx_path='/var/www/html/'

while getopts :ic flag
do
    case "${flag}" in
        i) npm i;;
        c) npm ci;;
    esac
done

npm run build
echo "[Build] npm run build - OK!"

rm -rf /var/www/html/*
echo "[Remove] rm -rf - OK!"

find ./build/ -type f -print0 | xargs -0 mv -t $nginx_path
echo "[Move] mv -t - OK!"

systemctl restart nginx.service
echo "[Restart] systemctl - OK!"
