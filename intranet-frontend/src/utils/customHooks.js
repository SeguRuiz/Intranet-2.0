// Custom model 
export const useCustomModal = (ref) => {
    const openModal = () => {
      ref.current.showModal();
    };
    const closeModal = () => {
      ref.current.close();
    };
    const closeModalDlg = (event) => {
       if (event.target == ref.current){
        ref.current.close()
       } 
    }
    return {
      openModal,
      closeModal,
      closeModalDlg
    };
  };