 const usePersonalInfo = () => {
     const bankAccount = '2301995370'
     const bankCode = '2010'
    const my = {
        firstName: 'Linh',
        lastName: 'Hoang',
        phone: '+420774316610',
        address: 'Suchy vrsek 2118/8 \n 158 00 Praha',
        workAddress: 'Premyslovska 43 \n Praha 3 - Zizkov 130 00 \n Czech republic ',
        email: 'linh.hoang@outlook.cz'
    }

     return {bankAccount, bankCode, my}
}

export default usePersonalInfo