/**
 * 
 * @param email: string
 * @returns boolean
 */
export const validateNonRepeatingDomains = ( email: string ): boolean => {

    const domains = email.split('@')[1].split('.');
    const domainsWithoutDuplicates = [...new Set(domains)];

    if(domainsWithoutDuplicates.length < domains.length ) return false;

    return true;
}