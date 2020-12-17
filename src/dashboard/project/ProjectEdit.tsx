import React, { useState } from 'react';
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextArea } from '../../components/textarea/TextArea';
import { Input } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    accRoot: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  });

const useStyles = makeStyles(styles);

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface Props {
  isOpen: boolean;
  close: () => void;
  project?: {
    title: string;
  };
}

export const ProjectEditorModal: React.FC<Props> = ({ isOpen, close, project }) => {
  const classes = useStyles();
  const [projectForm, setProjectForm] = useState<{
    specific: string;
    measurable: string;
    achievable: string;
    realistic: string;
    time: string;
  }>({
    specific: '',
    measurable: '',
    achievable: '',
    realistic: '',
    time: '',
  });
  const [connectionsForm, setConnectionsForm] = useState<{
    epics: string;
    projects: string;
    notes: string;
    todos: string;
  }>({
    epics: '',
    projects: '',
    notes: '',
    todos: '',
  });
  const [step, setStep] = useState<'project' | 'connections'>('project');

  return (
    <Dialog
      onClose={close}
      aria-labelledby='customized-dialog-title'
      open={isOpen}
      maxWidth='md'
      fullWidth={true}
    >
      <DialogTitle id='customized-dialog-title' onClose={close}>
        {project?.title ?? 'Create a Project'}
      </DialogTitle>
      <DialogContent dividers>
        {step === 'project' && (
          <div className={classes.accRoot}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>SPECIFIC</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextArea
                  value={projectForm.specific}
                  onChange={(e) => setProjectForm((s) => ({ ...s, specific: e.target.value }))}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>MEASURABLE</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextArea
                  value={projectForm.measurable}
                  onChange={(e) => setProjectForm((s) => ({ ...s, measurable: e.target.value }))}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>ACHIEVABLE</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextArea
                  value={projectForm.achievable}
                  onChange={(e) => setProjectForm((s) => ({ ...s, achievable: e.target.value }))}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>REALISTIC</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextArea
                  value={projectForm.realistic}
                  onChange={(e) => setProjectForm((s) => ({ ...s, realistic: e.target.value }))}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>TIMELY</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextArea
                  value={projectForm.time}
                  onChange={(e) => setProjectForm((s) => ({ ...s, time: e.target.value }))}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        )}
        {step === 'connections' && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>EPICS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Input
                value={connectionsForm.epics}
                onChange={(e) => setConnectionsForm((s) => ({ ...s, epics: e.target.value }))}
              />
            </AccordionDetails>
          </Accordion>
        )}
      </DialogContent>
      <DialogActions>
        {step === 'connections' && (
          <Button onClick={() => setStep('project')} color='secondary' variant='contained'>
            Edit Project
          </Button>
        )}
        {step === 'project' && (
          <Button onClick={() => setStep('connections')} color='secondary' variant='contained'>
            Connections
          </Button>
        )}
        <Button onClick={close} color='primary' variant='contained'>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
