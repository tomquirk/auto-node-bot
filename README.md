# Auto(node)Bot
> NodeBots Brisbane 2016

I spent an afternoon building robots at [NodeBots Brisbane 2016](http://nodebotsau.io/). Here's some simple code to make your mBot autonomous!

### To run

1. Set up your mBot as per [this](https://github.com/Makeblock-official/mbot_nodebots) guide with _Bluetooth_ firmware.
2. 
```
node src/auto.js /dev/tty.Makeblock-ELETSPP
```

### Controls

Look at the code, but:
- `m` = manual override (when in autonomous mode)
- `a` = autonomous override (when in manual mode)
- `space` = to stop at any time
