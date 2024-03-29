import { makeStyles } from '@material-ui/styles';

export const useAppSelectStyles = makeStyles((theme: any) => ({
  formControl: {
    width: '100%',
    marginBottom: 10,
    '& fieldset': {
      borderRadius: '45px',
    },
  },
  errorLabel: {
    marginLeft: 0,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  multiSelect: {
    width: '100%',
  },
}));
