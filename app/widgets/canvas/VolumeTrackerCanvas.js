class VolumeTracker {
  constructor(canvas, options) {
    this.__canvas = canvas;
    this.__ctx = canvas.getContext("2d");
    this.__animationFrameId = null;
    this.__samples = [];

    this.__readOptionString(options, "backgroundColor", "#fff");
    this.__readOptionPositiveInteger(options, "channelCount", 2);
    this.__readOptionString(options, "channelBackgroundColor", "#eee");
    this.__readOptionString(options, "channelForegroundColorHigh", "#e00");
    this.__readOptionString(options, "channelForegroundColorMedium", "#ff0");
    this.__readOptionString(options, "channelForegroundColorLow", "#0f0");
    this.__readOptionNegativeInteger(options, "channelVolumeHigh", -6);
    this.__readOptionNegativeInteger(options, "channelVolumeMedium", -20);
    this.__readOptionNegativeInteger(options, "channelVolumeLow", -60);
    this.__readOptionPositiveInteger(options, "channelMargin", 4);
    this.__readOptionPositiveInteger(options, "duration", 5000);
    this.__readOptionString(options, "timeAxisColor", "#000");
    this.__readOptionPositiveInteger(options, "timeAxisFontSize", 9);
    this.__readOptionString(options, "timeAxisFontName", "sans-serif");
    this.__readOptionPositiveInteger(options, "timeAxisTopMargin", 4);
    this.__readOptionString(options, "volumeAxisColor", "#000");
    this.__readOptionPositiveInteger(options, "volumeAxisFontSize", 9);
    this.__readOptionString(options, "volumeAxisFontName", "sans-serif");
    this.__readOptionPositiveInteger(options, "volumeAxisLeftMargin", 4);

    this.__cacheComputations();

    this.__render();

    return this;
  }


  start() {
    this.__nextAnimationFrame();

    return this;
  }


  stop() {
    if(this.__animationFrameId !== null) {
      window.cancelAnimationFrame(this.__animationFrameId);
      this.__animationFrameId = null;
    }

    return this;
  }


  push(sampleStartTimestamp, sampleDuration, peakValues) {
    for(var i = 0; i < this.__channelCount; i++) {
      var peakValue = peakValues[i];
      var boundaries = this.__cachedChannelVerticalBoundaries[i];

      var heightTotal = boundaries[1] - (boundaries[1] * peakValue / this.__channelVolumeLow);
      var heightLow = null;
      var heightMedium = null;
      var heightHigh = null;

      if(peakValue >= this.__channelVolumeLow) {
        if(peakValue < this.__channelVolumeMedium) {
          var scaleSize = this.__channelVolumeMedium - this.__channelVolumeLow;
          var scaleOffset = -1 * this.__channelVolumeMedium;
          var scalePeakValue = (peakValue + scaleOffset) * -1;
          var distance = (scalePeakValue / scaleSize);

          var color = this.__colorRgbToHex(this.__computeColorBetween(distance, this.__cachedChannelForegroundColorLowAsRgb, this.__cachedChannelForegroundColorMediumAsRgb));

        } else if(peakValue < this.__channelVolumeHigh) {
          var scaleSize = this.__channelVolumeHigh - this.__channelVolumeMedium;
          var scaleOffset = -1 * this.__channelVolumeHigh;
          var scalePeakValue = (peakValue + scaleOffset) * -1;
          var distance = (scalePeakValue / scaleSize);

          var color = this.__colorRgbToHex(this.__computeColorBetween(distance, this.__cachedChannelForegroundColorMediumAsRgb, this.__cachedChannelForegroundColorHighAsRgb));

        } else {
          var color = this.__channelForegroundColorHigh;
        }

        this.__samples.push([
          sampleStartTimestamp,
          sampleDuration,
          boundaries[0] + boundaries[1], // low y offset
          -1 * heightTotal,              // low height
          color
        ]);
      }
    }

    return this;
  }


  __readOptionPositiveInteger(options, key, defaultValue) {
    if(typeof(options) === "object" && options.hasOwnProperty(key) && typeof(options[key]) === "number" && Number.isInteger(options[key]) && options[key] > 0) {
      this["__" + key] = options[key];
    } else {
      this["__" + key] = defaultValue;
    }

    this.__createOptionGetter(key);
  }


  __readOptionNegativeInteger(options, key, defaultValue) {
    if(typeof(options) === "object" && options.hasOwnProperty(key) && typeof(options[key]) === "number" && Number.isInteger(options[key]) && options[key] < 0) {
      this["__" + key] = options[key];
    } else {
      this["__" + key] = defaultValue;
    }

    this.__createOptionGetter(key);
  }


  __readOptionString(options, key, defaultValue) {
    if(typeof(options) === "object" && options.hasOwnProperty(key) && typeof(options[key]) === "string") {
      this["__" + key] = options[key];
    } else {
      this["__" + key] = defaultValue;
    }

    this.__createOptionGetter(key);
  }


  __createOptionGetter(key) {
    this["get" + key[0].toUpperCase() + key.substr(1)] = function() {
      return this["__" + key];
    }
  }


  __render() {
    this.__renderBackground();
    this.__renderChannels();
    this.__renderTimeAxis();
    this.__renderVolumeAxis();
  }


  __renderBackground() {
    this.__ctx.save();
    this.__ctx.fillStyle = this.__backgroundColor;
    this.__ctx.fillRect(0, 0, this.__canvas.width, this.__canvas.height);
    this.__ctx.restore();
  }


  __renderChannels() {
    this.__ctx.save();
    this.__ctx.fillStyle = this.__channelBackgroundColor;

    for(var i = 0; i < this.__channelCount; i++) {
      var boundaries = this.__cachedChannelVerticalBoundaries[i];

      this.__ctx.fillRect(0, boundaries[0], this.__cachedChannelAvailableWidth, boundaries[1]);
    }
    this.__ctx.restore();
  }


  __renderTimeAxis() {
    this.__ctx.save();
    this.__ctx.fillStyle = this.__timeAxisColor;
    this.__ctx.font = this.__timeAxisFontSize + "px " + this.__timeAxisFontName;
    this.__ctx.textAlign = "center";

    var y = this.__canvas.height;
    for(var i = 0; i < this.__duration / 1000; i++) {
      var x = this.__cachedChannelAvailableWidth - (i * this.__cachedChannelAvailableWidth / this.__duration * 1000);

      this.__ctx.fillRect(x, this.__canvas.height - this.__timeAxisFontSize - this.__timeAxisTopMargin, 1, this.__timeAxisTopMargin);
      if(i === 0) {
        this.__ctx.fillText("0 s", x, y);
      } else {
        this.__ctx.fillText("−" + i + " s", x, y);
      }
    }
    this.__ctx.restore();
  }


  __renderVolumeAxis() {
    this.__ctx.save();
    this.__ctx.fillStyle = this.__volumeAxisColor;
    this.__ctx.font = this.__volumeAxisFontSize + "px " + this.__volumeAxisFontName;
    this.__ctx.textAlign = "left";
    this.__ctx.textBaseline = "middle";

    var x = this.__canvas.width - this.__cachedVolumeAxisTextWidth;

    for(var i = 0; i < this.__channelCount; i++) {
      this.__ctx.fillText((this.__channelVolumeLow + " dB").replace("-", "−"), x, this.__cachedChannelVerticalBoundaries[i][0] + this.__cachedChannelVerticalBoundaries[i][1]);
      this.__ctx.fillText((this.__channelVolumeMedium + " dB").replace("-", "−"), x, this.__cachedChannelVerticalBoundaries[i][0] + ((this.__channelVolumeMedium / this.__channelVolumeLow) * this.__cachedChannelVerticalBoundaries[i][1]));
      this.__ctx.fillText((this.__channelVolumeHigh + " dB").replace("-", "−"), x, this.__cachedChannelVerticalBoundaries[i][0] + ((this.__channelVolumeHigh / this.__channelVolumeLow) * this.__cachedChannelVerticalBoundaries[i][1]));
    }
    this.__ctx.restore();
  }


  __renderSamples() {
    this.__ctx.save();
    var now = new Date();
    var newSamples = [];

    for(var i = 0; i < this.__samples.length; i++) {
      var sampleStartTimestamp = this.__samples[i][0];
      var sampleDuration = this.__samples[i][1];
      var y = this.__samples[i][2];
      var height = this.__samples[i][3];
      var color = this.__samples[i][4];

      var offset = now - sampleStartTimestamp;
      if(offset <= this.__duration) {
        var width = sampleDuration / this.__duration * this.__cachedChannelAvailableWidth;
        var x = this.__cachedChannelAvailableWidth - (offset / this.__duration * this.__cachedChannelAvailableWidth) - width;

        newSamples.push(this.__samples[i]);

        this.__ctx.fillStyle = color;
        this.__ctx.fillRect(x, y, width, height);
      }
    }

    this.__samples = newSamples;
    this.__ctx.restore();
  }


  __nextAnimationFrame() {
    this.__animationFrameId = window.requestAnimationFrame(this.__onAnimationFrame.bind(this));
  }


  __onAnimationFrame() {
    this.__renderChannels();
    this.__renderSamples();

    this.__nextAnimationFrame();
  }


  __cacheComputations() {
    this.__computeChannelColorsAsRgb();
    this.__computeChannelAvailableHeight();
    this.__computeVolumeAxisTextWidth();
    this.__computeChannelAvailableWidth();

    this.__cachedChannelVerticalBoundaries = [];
    for(var i = 0; i < this.__channelCount; i++) {
      this.__cachedChannelVerticalBoundaries.push(this.__computeChannelVerticalBoundary(i));
    }
  }


  __computeVolumeAxisTextWidth() {
    this.__ctx.fillStyle = this.__volumeAxisColor;
    this.__ctx.font = this.__volumeAxisFontSize + "px " + this.__volumeAxisFontName;
    this.__ctx.textAlign = "left";

    var lowWidth = this.__ctx.measureText((this.__channelVolumeLow + " dB").replace("-", "−")).width;
    var mediumWidth = this.__ctx.measureText((this.__channelVolumeMedium + " dB").replace("-", "−")).width;
    var highWidth = this.__ctx.measureText((this.__channelVolumeHigh + " dB").replace("-", "−")).width;

    this.__cachedVolumeAxisTextWidth = Math.max(lowWidth, mediumWidth, highWidth);
  }


  __computeChannelAvailableWidth() {
    this.__cachedChannelAvailableWidth = this.__canvas.width - this.__cachedVolumeAxisTextWidth - this.__volumeAxisLeftMargin;
  }


  __computeChannelAvailableHeight() {
    this.__cachedChannelAvailableHeight = this.__canvas.height - this.__timeAxisFontSize - this.__timeAxisTopMargin;
  }


  __computeChannelVerticalBoundary(channelNumber) {
    var totalChannelMarginsHeight = (this.__channelCount - 1) * this.__channelMargin;
    var channelHeight = Math.round((this.__cachedChannelAvailableHeight - totalChannelMarginsHeight) / this.__channelCount);
    var channelTop = channelHeight * channelNumber + (channelNumber > 0 ? this.__channelMargin : 0);

    var arr = new Uint16Array(2);
    arr[0] = channelTop;
    arr[1] = channelHeight;
    return arr;
  }


  __computeChannelColorsAsRgb() {
    this.__cachedChannelForegroundColorLowAsRgb = this.__colorHexToRgb(this.__channelForegroundColorLow);
    this.__cachedChannelForegroundColorMediumAsRgb = this.__colorHexToRgb(this.__channelForegroundColorMedium);
    this.__cachedChannelForegroundColorHighAsRgb = this.__colorHexToRgb(this.__channelForegroundColorHigh);
  }


  __colorHexToRgb(hex) {
    var result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(hex);
    return result ? Uint8ClampedArray.of(
      parseInt(result[1].length === 1 ? result[1] + "" + result[1] : result[1], 16),
      parseInt(result[2].length === 1 ? result[2] + "" + result[2] : result[2], 16),
      parseInt(result[3].length === 1 ? result[3] + "" + result[3] : result[3], 16)
    ) : null;
  }


  __colorRgbToHex(color) {
    return "#" + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
  }


  __computeColorBetween(distance, begin, end) {
    var w = distance * 2 - 1;
    var w1 = (w + 1) / 2.0;
    var w2 = 1 - w1;

    var rgb = Uint8ClampedArray.of(
      parseInt(begin[0] * w1 + end[0] * w2),
      parseInt(begin[1] * w1 + end[1] * w2),
      parseInt(begin[2] * w1 + end[2] * w2));

    return rgb;
  }
}

module.exports = VolumeTracker;
