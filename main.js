;(function(nativeGlobal, undefined) {

var log = function() {
  console && console.log.apply(console, arguments)
}

var random = (function() {
  var seed = 0 | +new Date()
  return function(a, b) {
    return a + (b - a) * (seed = (0 | (22695477 * seed + 1))) / (-1 >>> 0)
  }
})()

var document = nativeGlobal.document

ImageData_fillAlpha = function(p, v) {
  v = v || 255
  var end = p.width * p.height * 4 + 3
  for(var i = 3; i != end; i += 4) {
    p.data[i] = v
  }
}

var Flame = function() {
  
}
Flame.prototype = {
  constructor: function() { { var p = this }
    p.frame = null
    p.data = []
  }, 
  nextFrame: function(p) { { var p = this }
    var W = p.frame.width
    var H = p.frame.height
    var frameData = p.frame.data
    
    var fade = function(x) {
      return -4 * x * x + 4 * x
    }
    var form = function(x) {
      return x + W * (H - 1)
    }
    var form = function(x) {
      var y
      if(x < W / 2) {
        y = W / 2 - x
      }
      else {
        y = x - W / 2
      }
      return x + W *  (0 | (H - 1 - y / 2))
    }
    for(var x = 3; x != W - 3; x += 1) {
      p.data[form(x)] = random(0.7, 1) * fade(x / W)
    }
    // for(var x = 3; x != W - 3; x += 1) {
      // for(var y = H - 1; y != H - W - 6; y -= 1) {
        // p.data[x + (y - 0) * W] = random(0.7, 1) * Math.max(1 - (Math.pow(Math.pow(x - W / 2, 2) + Math.pow(y - (H - (W  - 6) / 2), 2), 0.5) / ((W - 6) / 2)), 0)
      // }
    // }
    var data = p.data.concat()
    var wind = random(0.3, 2.0 - 0.3)
    var wind = (0.3) + ((2.0 - 0.3 - (0.3))) * Math.random()
    // var wind = 1
    if(1) {
    for(var y = H - 1; y != 1; y -= 1) {
      for(var x = 0; x != W; x += 1) {
        p.frame
        ;{
          var numOfNeighbors = 0
          var sum = 0
          
          if(0 < x) {
            sum += wind * data[(x - 1) + W * (y)]
            numOfNeighbors += 1
          }
          if(x < W - 1) {
            sum += (2 - wind) * data[(x + 1) + W * (y)]
            numOfNeighbors += 1
          }
          if(0 < y) {
            sum += data[(x) + W * (y - 1)]
            numOfNeighbors += 1
          }
          if(y < H - 1) {
            sum += data[(x) + W * (y + 1)]
            numOfNeighbors += 1
          }
          // if(x != 0 && x != W - 1) {
            sum += data[(x) + W * (y)]
            numOfNeighbors += 1
          // }

          p.data[(x) + W * (y - 1)] = (1.0 - 2e-2) * sum / numOfNeighbors  
        }
      }
    }
    
    }
    var max = Math.max.apply(null, p.data)
    // log(data)
    // log(p.data)
    // log(max)
    for(var y = 0; y != H; y += 1) {
      for(var x = 0; x != W; x += 1) {
        frameData[(x + W * y) * 4 + 0] = 255 
        frameData[(x + W * y) * 4 + 1] = 0 | 255 * (y) / H * (1 - Math.pow(Math.abs(x - W  / 2) / (W / 2),  0.9))
        frameData[(x + W * y) * 4 + 2] = 0 //| 255 * (H - y) / H
        if(p.data[(x + W * y)] < 0.2) {
          frameData[(x + W * y) * 4 + 3] = 0
        }
        else {
          frameData[(x + W * y) * 4 + 3] = 0 | (256 * (5 / max) * p.data[x + W * y]) 
        }
      }
    }
    if(1) {
    for(var i = 0; i != 3; i += 1) {
      for(var y = 0; y != H; y += 1) {
        for(var x = 0; x != W - 1; x += 1) {
          if(frameData[(x + W * y) * 4 + 3] == 0 && frameData[((x + 1) + W * y) * 4 + 3] != 0) {
            frameData[(x + W * y) * 4 + 3] = 0 | frameData[(x + 1 + W * y) * 4 + 3] / 3
          }
        }
        for(var x = 1; x != W; x += 1) {
          if(frameData[(x + 1 + W * y) * 4 + 3] == 0 && frameData[((x) + W * y) * 4 + 3] != 0) {
            frameData[(x + 1 + W * y) * 4 + 3] = 0 | frameData[(x + W * y) * 4 + 3] / 3
          }
        }
      }
    }
    }
  }
}


var main = function(args) {
  [[95, 88], [112, 80], [130, 94], [149, 79], [170, 98], [183, 83], [209, 98]].forEach(function(point) {
    var W = 12
    var H = 30
    var canvas = document.createElement("canvas")
    ;{
      canvas.width = W
      canvas.height = H
      ;{
        canvas.style.position = "absolute"
        canvas.style.left = point[0] - W / 2
        canvas.style.top = point[1] - H
      }
    }
    
    document.body.appendChild(canvas)
    var context = canvas.getContext('2d')
    
    var f = new Flame()
    ;{
      f.frame = context.createImageData(W, H)
      ;{
        ImageData_fillAlpha(f.frame)
      }
      f.data = new Array(W * H)
      ;{
        for(var i = 0; i != W * H; i += 1) {
          f.data[i] = 0
        }
      }
    }
    
    for(var i = 0; i != 20; i += 1) {
      f.nextFrame()
    }
    
    // document.body.onclick = function() {
    setInterval(function() {
      canvas.width = canvas.width
      // context.clearRect(0, 0, W, H)
      f.nextFrame()
      context.putImageData(f.frame, 0, 0)
    }, 1000 / 25)    
  })
}

nativeGlobal.onload = function() {
  main([])
}

})(this)
