#bin/bash
filenames=`ls ./*.py`
for eachfile in $filenames
do
   echo $eachfile
   Filetime=$(stat --printf=%y $eachfile | cut -d. -f1)
   echo $Filetime
   if [[ $Filetime > "2018-04-01 00:00:00" && $Filetime < '2018-04-31 23:59:59' ]]; then
       cp $eachfile C:/Users/bhawika.gupta/Desktop
   fi
done