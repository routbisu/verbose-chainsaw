export const fetchLenderFormDetails = async (lenderSlug: string) => {
  const result = await fetch(`/api/lenders/${lenderSlug}`);
  return await result.json();
};

export const submitLenderDetails = async (
  lenderSlug?: string,
  formDetails?: any,
) => {
  const result = await fetch(`/api/lenders/${lenderSlug}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formDetails),
  });

  return await result.json();
};
