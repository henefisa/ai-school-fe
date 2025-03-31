export const getDisplayName = (profile: {
  firstName: string;
  lastName: string;
}) => {
  if (!profile) {
    return '';
  }

  return `${profile.firstName} ${profile.lastName}`;
};
