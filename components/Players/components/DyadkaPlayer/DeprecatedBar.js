// import Tooltip from '@material-ui/core/Tooltip';
// import {withStyles} from '@material-ui/core/styles';
// import Slider from '@material-ui/core/Slider';
//
// const ValueLabelComponent = (props) => {
//   const {children, open, value} = props;
//
//   return (
//     <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
//       {children}
//     </Tooltip>
//   );
// };
//
// const PrettoSlider = withStyles({
//   root: {
//     height: 8,
//   },
//   thumb: {
//     height: 16,
//     width: 16,
//     backgroundColor: '#fff',
//     border: '2px solid currentColor',
//     marginTop: -4,
//     marginLeft: -8,
//     '&:focus, &:hover, &$active': {
//       boxShadow: 'inherit',
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: 'calc(-50% + 4px)',
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#ff4f12',
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);
//
// <PrettoSlider
//   min={0}
//   max={1}
//   value={progress.played}
//   ValueLabelComponent={(props) => (
//     <ValueLabelComponent
//       {...props}
//       value={progress.playedFormatted}
//     />
//   )}
//   //onChange={handleSeekChange}
// />