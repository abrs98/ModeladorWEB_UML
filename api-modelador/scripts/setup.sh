while getopts :ic flag
do
    case "${flag}" in
        i) npm i;;
    esac
done

npm run start
