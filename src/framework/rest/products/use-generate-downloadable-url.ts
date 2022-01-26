import { useGenerateDownloadableUrlMutation } from './products.query';

const useGenerateDownloadableUrl = () => {
  const { mutate: getDownloadableUrl } = useGenerateDownloadableUrlMutation({
    onSuccess: (data: any) => {
      function download(fileUrl: string, fileName: string) {
        var a = document.createElement('a');
        a.href = fileUrl;
        a.setAttribute('download', fileName);
        a.click();
      }
      download(data?.data!, 'record.name');
    },
  });

  function generateDownloadableUrl(digital_file_id: string) {
    getDownloadableUrl({
      digital_file_id,
    });
  }

  return {
    generateDownloadableUrl,
  };
};

export default useGenerateDownloadableUrl;
