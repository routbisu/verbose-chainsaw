import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import BreadCrumbs from 'components/BreadCrumbs';
import { deSnake } from 'lib/types/utils';

const styles = {
  container: {
    margin: 40,
    maxWidth: 500,
  },
  formControl: {
    margin: `15px 0px`,
  },
};

const LenderNamePage: NextPage = () => {
  const router = useRouter();
  const lenderSlug = router.query.lenderName?.toString();
  const [bankName, setBankName] = useState('');
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    if (lenderSlug) {
      fetch(`/api/lenders/${lenderSlug}`)
        .then((res) => res.json())
        .then((formDetails) => {
          console.log('formDetails', formDetails);

          if (formDetails) {
            const { name, fields } = formDetails;
            setBankName(name);
            setFormFields(fields);
          }
        });
    }
  }, [lenderSlug]);

  return (
    <div style={styles.container}>
      <BreadCrumbs currentPage={lenderSlug} />

      <Typography variant="h5" component="h1">
        Apply for a{' '}
        <Typography variant="h5" component="span" color="primary">
          {bankName || lenderSlug}
        </Typography>{' '}
        account.
      </Typography>

      {formFields?.length > 0 && (
        <form>
          {formFields.map((field) => (
            <div style={styles.formControl} key={field}>
              <TextField label={deSnake(field)} fullWidth />
            </div>
          ))}
          <Button variant="outlined" size="large" color="primary" fullWidth>
            Check eligibility
          </Button>
        </form>
      )}
    </div>
  );
};

export default LenderNamePage;
