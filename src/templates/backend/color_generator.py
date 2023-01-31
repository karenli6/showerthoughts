import matplotlib.pyplot as plt
import random

# random color generator (AVOID colors that are similar to white)
def get_color_array(num_colors):
  # highlighted color: #f2f2f2
  prohibited_colors = ["#EDEADE","#f2f2f2", "#F5F5DC", "#F9F6EE", "#FFF8DC", "#FFFDD0", "#F0EAD6", "#FFFFF0", "	#E9DCC9", "#FAF9F6", "#FCF5E5","#FFE5B4", "#FFFFFF","#F3E5AB", "#FFF5EE" ]
  i = 0
  color = []
  while (i < num_colors):
    newcolor = "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)])
    if newcolor not in prohibited_colors :
      color.append(newcolor)
      i+=1

  return color