import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Video, {
  LoadError,
  OnLoadData,
  VideoProperties,
} from 'react-native-video';
import Slider from '@react-native-community/slider';

const {width: screenWidth} = Dimensions.get('window');

const VIDEO_URL =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const App = () => {
  //const videoRef = useRef<VideoProperties>(null);
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [videoQuality, setVideoQuality] = useState(1);

  /*
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        //videoRef.current?.pause();
        setIsPlaying(false);
      } else {
        //videoRef.current?.play();
        setIsPlaying(true);
      }
    }
  };
*/
  const handlePlayPause = () => {
    if (isPlaying) {
      //videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      //videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      setVolume(value);
      //videoRef.current.setNativeProps({volume: value});
    }
  };

  const handleVideoQualityChange = (value: number) => {
    setVideoQuality(value);
  };

  const handleLoadError = (error: LoadError) => {
    console.log('Error loading video:', error);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{uri: VIDEO_URL}}
        style={styles.video}
        ref={videoRef}
        resizeMode="contain"
        onLoad={data => console.log('Duration: ', data.duration)}
        onError={handleLoadError}
        onEnd={handleEnd}
        repeat={true}
        volume={volume}
      />
      <TouchableOpacity
        style={styles.playPauseButton}
        onPress={handlePlayPause}>
        <Text style={styles.playPauseButtonText}>
          {isPlaying ? 'Pause' : 'Play'}
        </Text>
      </TouchableOpacity>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        value={volume}
        onValueChange={handleVolumeChange}
      />
      <Text style={styles.qualityText}>
        Volume: {Math.round(volume * 100)}%
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={4}
        step={1}
        value={videoQuality}
        onValueChange={handleVideoQualityChange}
      />
      <Text style={styles.qualityText}>Video Quality: {videoQuality}x</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: screenWidth,
    height: screenWidth * (9 / 16),
  },
  playPauseButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  playPauseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  slider: {
    width: screenWidth - 40,
    marginTop: 20,
  },
  qualityText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default App;
