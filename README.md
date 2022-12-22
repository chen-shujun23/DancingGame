# Retro Beats

This is a dancing game inspired by retro PSX game, Bishi Bashi Perm Mania, which challenges the player's sense of rhythm. The player listens to the melody once first to get a sense of the rhythm. Immediately after, the player needs to replicate the rhythm by tapping on the 'enter' key. With each beat on point, the player is awarded 1 point. There are 3 melodies to dance to. To win, the player needs to score above 10 upon 19 points. Dancing characters are animated to dance according to the rhythms and beats.

## Technologies Used

1. Visual Studio Code for scripting
2. Adobe PhotoShop for editing images
3. Garageband for making background music
4. iMovie for editing instruction video
5. **[Pine Tools](https://pinetools.com/pixelate-effect-image)** for achieving pixelated effect on images
6. **[Piskel](https://www.piskelapp.com/p/create/sprite)** for creating GIFs
7. **[Canva](https://www.canva.com/)** for making button images

## General Approach

**Object Literal Programming & Event Listeners**

- Creating objects using object literals, which are collections of key-value pairs.
- Adding event listeners to listen for specific events and event handlers that return results needed to advance the game.

### Breakdown of Approach

1. **Global Variables:** Declare the rhythm of the 3 melodies using 1s and 0s in arrays. Iterate the arrays to get the precise timings the player must hit to score 1 point. Combine the precise timings into an array, which the player's result must tally with.
2. **Root Game Object:** Create the top-level root game object that defines the entire scope of the game. This is the main composition object that initialises other objects' assets and methods. Top-level variables and methods for the game to run will be assigned to the game object, such as the methods needed to switch to the end screen after the game has ended.
3. **Image & Audio Loader Object:** Create a loader object that can be used to load new images and audios in other objects. This will come in handy as the game expands and more assets need to be loaded.
4. **Create other objects** like the instruction, level, scoreboard and ending objects. The loader's methods are used in these other objects to load audio and images. These objects are in turn initialised in the root game object.
5. **Add Event Listeners** There are two main event listeners. The first listens for the pressing of the enter key, and if the timing matches the precise timings in point 1, the score will be updated in the scoreboard. Also, the image of the player character changes to animate the dance moves whenever the player hits the precise timing. The second listens for the end of the base audio track of the game. When the music stops, the game ends. Depending on the score, either the winning or losing screen will appear.

### Reasons for Object Literal Approach:

- **Simplicity**
  - Object literals are a simple and concise way of creating objects.
  - Do not require the use of constructor functions.
  - Makes code easier to read and understand by compartmentalising code into objects
- **Flexibitlity**
  - Can easily create new objects to scale up the game, such as new levels with varying difficulties
  - Can easily add and remove properties assigned to objects as needed

## Challenges

- Matching the animation with the audio
- Animating the player character with each enter keydown; transition is extremely laggy on the live website
- Was not able to piece together the beat and melody using javascript without pauses between each audio

## Unsolved Problems & Further Work

1. Player's character flickers when it changes dance moves. This could be because it is animated by iterating and switching the image source url. This might be resolved by using a spritesheet of all the player images in one canvas, instead of using individual player images.
2. To include a second player or allow the player to play against a pre-programmed computer.
3. Consider different levels of difficulties.

## References

**Audio**

- Background music remade according to the original **[Bishi Bashi Perm Mania](https://www.youtube.com/watch?v=l1MjKC9nDeM)**
- **[Booing audio](https://pixabay.com/sound-effects/boo-6377/)**
- **[Cheering audio](https://pixabay.com/sound-effects/short-crowd-cheer-6713/)**

**Images**

- **[Spritesheet](https://www.spriters-resource.com/fullview/7677/)**
- **[Enter button image](http://pixelartmaker.com/art/b868ed6b29546ba)**
- **[Crowd cheering image](https://favpng.com/png_view/crowd-cheering-applause-image-clip-art-clapping-png/ZYm8BHf9)**
- **[Dance floor background](https://www.pngegg.com/en/png-bzgte)**
