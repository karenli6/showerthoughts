import matplotlib.pyplot as plt
import random

# random color generator
def get_color_array(num_colors):
  # highlighted color: #f2f2f2
  i = 0
  color = []
  while (i < num_colors):
    newcolor = "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)])
    if newcolor != "#f2f2f2":
      color.append(newcolor)
      i+=1

  return color