const GREEN = "#8BCF9F";
const BLUE = "#6CC3D5"; 
const PURPLE = "#aa80ff";
const YELLOW = "#FFCE67";
const PINK = "#ff80ff";
const RED = "#ff6666";
const ORANGE = "#F48C51";
const MAROON = "#DC6A4A";
const IVORY = "#E7E7BD";
const GOLD = "#CBA34C";
const SKY = "#ABBBD9";
const CRIMSON = "#c90016";
const TAN = "#D6A879";
const FOREST = "#5EB379";
const BABY = "#A6D5D3";
const Colors = {}

Colors.Histogram = [GREEN],
Colors.Categorical = [GREEN, BLUE, YELLOW, ORANGE, RED, PURPLE, PINK, MAROON, IVORY, FOREST, GOLD, SKY, TAN, BABY ,CRIMSON],
Colors.Binary = [GREEN, RED],
Colors.Gradient3 = [GREEN, YELLOW, RED], 
Colors.Gradient4 = [GREEN, YELLOW, ORANGE, RED], 
Colors.Gradient5 = [GREEN, BLUE, YELLOW, ORANGE, RED],
Colors.ReverseBinary = Colors.Binary.slice().reverse(), 
Colors.ReverseGradient3 = Colors.Gradient3.slice().reverse(),
Colors.ReverseGradient4= Colors.Gradient4.slice().reverse(),
Colors.ReverseGradient5 = Colors.Gradient5.slice().reverse()


export default Colors