import { TextareaAutosize, TextareaAutosizeProps } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      fontSize: '1.2rem',
      fontFamily: 'inherit',
    },
  });

const useStyles = makeStyles(styles);

export const TextArea = (props: TextareaAutosizeProps) => {
  const classes = useStyles();
  return <TextareaAutosize className={classes.root} {...props} />;
};
