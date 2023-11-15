import React from 'react';
import { ConfigProvider } from 'antd';

import theme from '@/theme/themeConfig';
import SpellList from '@/components/SpellList/SpellList';

export default async function Page() {
    return (
        <ConfigProvider theme={theme}>
            <SpellList dndClass='cleric'/>
        </ConfigProvider>
    )
}