import { useGenerateDownloadableUrlMutation } from './products.graphql';

const useGenerateDownloadableUrl = () => {
  const [getDownloadableUrl] = useGenerateDownloadableUrlMutation({
    onCompleted: (data) => {
      function download(fileUrl: string, fileName: string) {
        var a = document.createElement('a');
        a.href = fileUrl;
        a.setAttribute('download', fileName);
        a.click();
      }
      download(data?.generateDownloadableUrl!, 'record.name');
    },
  });
  function generateDownloadableUrl(digital_file_id: string) {
    getDownloadableUrl({
      variables: {
        digital_file_id,
      },
    });
  }
  return { generateDownloadableUrl };
};

export default useGenerateDownloadableUrl;
