/** *
 * fileGenerator
 * @param name type: string (optional)
 * @param type type: string (optional)
 * @param size type: Number(in KB) (optional)
 * @param content type: string (optional)
 */
const fileGenerator = ({
  size, type, name, content,
}) => {
  const file = new File([content ?? 'some_file'], name ?? 'file_name.jpg', { type: type ?? 'image/jpg' });
  Object.defineProperty(file, 'size', { value: (Number(size) ?? 100) * 1024 });
  return file;
};
export default fileGenerator;
