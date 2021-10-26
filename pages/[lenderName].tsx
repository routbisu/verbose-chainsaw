import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import BreadCrumbs from 'components/BreadCrumbs';
import LenderFormControl from 'components/LenderFormControl';
import {
  fetchLenderFormDetails,
  submitLenderDetails,
} from 'services/lendingService';

const styles = {
  container: {
    margin: 40,
    maxWidth: 500,
  },
  formControl: {
    margin: `15px 0`,
  },
  card: {
    margin: `20px 0`,
    height: 200,
    color: 'white',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accepted: {
    background: 'green',
  },
  declined: { background: 'orange' },
};

const LenderNamePage: NextPage = () => {
  const router = useRouter();
  const lenderSlug = router.query.lenderName?.toString();
  const [bankName, setBankName] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [decision, setDecision] = useState<'accepted' | 'declined'>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (lenderSlug) {
        try {
          const { name, fields } = await fetchLenderFormDetails(lenderSlug);
          setBankName(name);
          setFormFields(fields);
        } catch (error) {
          console.log('There was an unexpected error', error);
        }
      }
    })();
  }, [lenderSlug]);

  const submitHandler = async (evt: any) => {
    evt.preventDefault();

    // Resets the form to try again for a new decision
    if (decision) {
      setDecision(undefined);
    } else {
      setIsSubmitting(true);
      try {
        const result = await submitLenderDetails(lenderSlug, formData);
        setDecision(result.decision);
        setFormData({});
      } catch (error) {
        console.log('There was an unexpected error', error);
      }
      setIsSubmitting(false);
    }
  };

  const changeHandler = (evt: any, fieldName: string) => {
    setFormData((curr) => ({ ...curr, [fieldName]: evt.target.value }));
  };

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

      {decision && (
        <div style={{ ...styles.card, ...styles[decision] }}>
          <Typography variant="h4">
            You've been {decision} {decision === 'accepted' ? '🤗' : '😥'}
          </Typography>
        </div>
      )}

      {formFields?.length > 0 && (
        <form onSubmit={submitHandler}>
          {!decision &&
            formFields.map((field) => {
              let fieldDetails =
                typeof field === 'string' ? { name: field } : field;

              const { name: fieldName } = fieldDetails;

              return (
                <div style={styles.formControl} key={fieldName}>
                  <LenderFormControl
                    {...fieldDetails}
                    value={formData[fieldName] || ''}
                    onChange={(evt) => changeHandler(evt, fieldName)}
                  />
                </div>
              );
            })}
          <Button
            variant="outlined"
            size="large"
            color="primary"
            type="submit"
            fullWidth
          >
            {decision
              ? 'Try Again'
              : isSubmitting
              ? 'Checking...'
              : 'Check eligibility'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default LenderNamePage;
