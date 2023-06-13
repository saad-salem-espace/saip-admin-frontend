const updateAssignedDocumentState = ({ documentId, assignmentStatus }) => ({
  url: `dashboard/assignment_documents/${documentId}`,
  method: 'PUT',
  data: { assignmentStatus },
});

export default updateAssignedDocumentState;
