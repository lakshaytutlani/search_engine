import pickle
import csv
import sys 


reload(sys)
sys.setdefaultencoding('latin1')
  # Reload does the trick!


# a=[1,2,3,4,5,6]


objects=[]
file_object = open("Kalman-2018-03-14.pickle", "rb")
# kalman = pickle.load(file_object)
# a= pickle.load(file_object)
#reload(sys)  
#sys.setdefaultencoding('utf8')
while True:
        try:    
            objects.append(pickle.load(file_object))
        except EOFError:
            break


file_object.close()

# print(a)
count = 0
with open('kalman_extracted_14_03.csv', 'wb') as csv_file:
    writer = csv.writer(csv_file)
    # for key, value in mydict.items():
       # writer.writerow([key, value])
       # count=count + 1
       # if count == 5:
           # break
    writer.writerows(objects[1:5])
           
csv_file.close()