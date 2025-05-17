//src/pages/Login/toggle-script.tsx

import { RefObject } from 'react';

const useLoginToggle = (
  loginContainerRef: RefObject<HTMLDivElement | null>
) => {
    // EVENTO DE CLIQUE PARA ADICIONAR O STATUS DE "ATIVO" DO CONTAINER
    const handleSignUpClick = () => {
        loginContainerRef.current?.classList.add('active');
    };

    // EVENTO DE CLIQUE PARA REMOVER O STATUS DE "ATIVO" DO CONTAINER
    const handleSignInClick = () => {
        loginContainerRef.current?.classList.remove('active');
    };

  return {
    handleSignUpClick,
    handleSignInClick,
  };
};

export default useLoginToggle;
