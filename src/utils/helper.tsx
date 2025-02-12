export const handleFieldErrors = (errors, setError) => {
  for (const field in errors) {
    setError(field, {
      message: errors[field],
    });
  }
};
