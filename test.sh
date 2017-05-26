if command -v node 2>/dev/null;
    then
        echo "Found node"
    else
        echo "Node not found. Please install it and try again"
        exit 1
fi

if command -v npm 2>/dev/null;
    then
        echo "Found npm"
    else
        echo "npm not found. Please install it and try again"
        exit 2
fi

if command -v mongod 2>/dev/null;
    then
        echo "Found mongod"
    else
        echo "mongod not found. Please install it and try again"
        exit 3
fi

if [ ! -d "database" ];
    then
        echo "Creating directory: database"
        mkdir database
fi

echo "Updating npm packages"
npm i

if pgrep -x "mongod" > /dev/null;
    then
        echo "mongod is already running"
    else
        echo "Starting mongod"
        mongod --fork --dbpath database --smallfiles --logpath mongo.log
fi

npm test