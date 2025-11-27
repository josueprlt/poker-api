import { SetMetadata } from '@nestjs/common';

// On définit une clé constante pour éviter les fautes de frappe
export const IS_PUBLIC_KEY = 'isPublic';

// On crée le décorateur SkipAuth qui associe la métadonnée 'isPublic' à true
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);