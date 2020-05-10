<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <img src="@/assets/SW.jpg" style="width: 120px;height: 40px;margin: 0 0 0 -20px;">
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-add-circle-outline" />
                            创建问卷
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-podium-outline" />
                            汇总统计
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-book-outline" />
                            问卷反馈
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider class="m_sider" hide-trigger :style="{background: '#515a6e'}">
                    <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                        <div class="m_menu">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-add-circle-outline" />
                                创建问卷
                            </template>
                            <router-link to="/handel">
                                <MenuItem name="1-1">问卷列表</MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-podium-outline" />
                                汇总统计
                            </template>
                            <router-link to="/statistics">
                                <MenuItem name="2-1">问卷汇总统计</MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-book-outline" />
                                问卷反馈
                            </template>
                            <router-link to="/feedback">
                                <MenuItem name="3-1">问卷反馈</MenuItem>
                            </router-link>
                        </Submenu>
                        </div>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '15px 0'}">
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
            <Footer class="layout-footer-center">2020-2021 &copy; TestVersions</Footer>
        </Layout>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
/* .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.m_sider {
    height: auto;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
} */
</style>
