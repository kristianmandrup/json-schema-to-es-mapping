for i in $(find `pwd` -name "*.js"); 
do 
    mv "$i" "${i%.js}.ts"
done