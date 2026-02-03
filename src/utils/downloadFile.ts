export const downloadFile = (content: string, filename: string, type = 'application/json') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  Object.assign(document.createElement('a'), {
    href: url,
    download: filename,
  }).click();

  URL.revokeObjectURL(url);
};
