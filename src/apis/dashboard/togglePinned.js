const togglePinned = ({ Ids }) => ({
  url: 'dashboard/togglePinned',
  method: 'PUT',
  data: Ids,
});

export default togglePinned;
