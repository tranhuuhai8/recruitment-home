<script lang="ts" setup>
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const router = useRouter()

const props = defineProps({
    columns: { type: Array<any>, required: true, default: [] },
    data: { type: Object, required: true },
    loading: { type: Boolean, required: true, default: true },
    showPagination: { type: Boolean, required: false, default: true },
    showTableHead: { type: Boolean, required: false, default: false },
    hasCreate: { type: Boolean, required: false, default: false },
    createLink: { type: String, required: false, default: '' },
    title: { type: String, required: false, default: '' },
    sortType: { type: String, required: false, default: '' },
})
const { columns, data, loading, sortType } = toRefs(props)
const emit = defineEmits(['changePage', 'handleReset', 'sort', 'cellClick'])

const customRow = (record: any) => ({
    onClick: (event: any) => {
        emit('cellClick', event, record)
    },
})

const handleChangeTable = (pagination: any, filters: any, sorter: any) => {
    if (Object.keys(sorter).length) {
        emit('sort', sorter)
    }
}

const onChangePage = (pageNumber: number) => emit('changePage', pageNumber)

const handleCreate = () => router.push(props.createLink)
</script>

<template>
    <section id="tbl">
        <div class="tbl-head" v-if="props.showTableHead">
            <h3 class="title">{{ title }}</h3>
            <a-button
                type="primary"
                @click="handleCreate"
                v-if="props.hasCreate"
            >
                {{ t('create') }}
            </a-button>
        </div>
        <a-table
            :columns="columns"
            :data-source="data?.data ?? []"
            :loading="loading"
            :pagination="false"
            :customRow="customRow"
            :class="sortType"
            @change="handleChangeTable"
        >
            <template #bodyCell="{}" />
        </a-table>
        <a-pagination
            :total="data.total"
            :page-size="data.per_page"
            :current="data.current_page"
            show-less-items
            :show-size-changer="false"
            @change="onChangePage"
            class="tbl-pagination"
            v-if="props.showPagination && data.total"
        >
            <template #itemRender="{ type, originalElement }">
                <a v-if="type === 'prev'">{{ t('pagination.prev') }}</a>
                <a v-else-if="type === 'next'">{{ t('pagination.next') }}</a>
                <component :is="originalElement" v-else />
            </template>
        </a-pagination>
    </section>
</template>

<style scoped lang="scss">
#tbl {
    margin: 0 10px;
    .tbl-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;

        .title {
            margin: 0;
            font-size: 19px;
            font-weight: 700;
            line-height: 28px;
            letter-spacing: 0em;
        }

        .ant-btn {
            border-radius: var(--vt-br-btn);
            background-color: var(--vt-c-main);
            width: 92px;
            height: 36px;
            box-shadow: unset;
        }
    }

    .tbl-pagination {
        text-align: center;
        margin-top: 16px;
        padding-bottom: 5px;

        a {
            &:not([disabled]) {
                color: var(--vt-c-gray-v1);
            }
        }

        &:deep(.ant-pagination-item) {
            font-weight: 700;

            &.ant-pagination-item-active {
                background: var(--vt-c-main);
                border: var(--vt-c-main);

                a {
                    color: var(--vt-c-white);
                }
            }
        }
    }

    &:deep(.ant-table) {
        border-radius: 0;

        .ant-table-thead {
            background-color: var(--vt-c-gray-v4);

            span {
                svg {
                    display: none;
                }
            }

            .ant-table-cell {
                padding: 8px 12px;
                font-size: 14px;
                font-weight: 700;
                line-height: 19px;
                letter-spacing: 0em;
                background-color: var(--vt-c-white);
                border-bottom: 1px solid var(--vt-c-black-bold);

                .ant-table-column-sorters {
                    span {
                        font-weight: 700;
                    }
                }
            }

            tr:first-child {
                & > *:first-child {
                    border-start-start-radius: 0px;
                }

                & > *:last-child {
                    border-start-end-radius: 0px;
                }
            }
        }

        .ant-table-tbody {
            .ant-table-column-sort {
                background-color: var(--vt-c-white);
            }

            .ant-table-cell {
                padding: 8px 12px;
                font-size: 14px;
                font-weight: 400;
                line-height: 19px;
                letter-spacing: 0em;
                height: 50px;

                .active {
                    background-color: var(--vt-c-main);
                }

                .inactive,
                .unverified {
                    background-color: var(--vt-c-gray-v1);
                }

                .locked,
                .part_time {
                    background-color: var(--vt-c-primary);
                }

                .default,
                .draft {
                    background-color: var(--vt-c-gray-v1);
                }

                .customize {
                    background-color: var(--vt-c-primary);
                }

                .full_time {
                    background-color: var(--vt-c-blue);
                }

                .open {
                    background-color: var(--vt-c-green);
                }

                .closed {
                    background-color: var(--vt-c-red);
                }

                .type-status {
                    cursor: pointer;
                    max-width: unset;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 19px;
                    letter-spacing: 0em;
                    border-radius: 5px;
                    text-align: center;
                    color: var(--vt-c-white);

                    &:hover {
                        opacity: 0.8;
                    }
                }

                .update {
                    span {
                        font-size: 13px;
                    }
                }

                .ant-btn-default {
                    border: none;
                }
            }

            .ant-table-row {
                &:hover {
                    .ant-table-cell,
                    .ant-table-column-sort {
                        background-color: var(--vt-c-white-v2);
                    }
                }
            }
        }

        @media only screen and (max-width: 1000px) {
            overflow-x: auto;

            .ant-table-container {
                width: 700px;
            }
        }
    }

    .descending {
        &:deep(.ant-table) {
            .ant-table-thead {
                span {
                    &.ant-table-column-sorter-down {
                        svg {
                            display: block;
                        }
                    }

                    &.ant-table-column-sorter-up {
                        svg {
                            display: none;
                        }
                    }
                }
            }
        }
    }

    .ascending {
        &:deep(.ant-table) {
            .ant-table-thead {
                span {
                    &.ant-table-column-sorter-up {
                        svg {
                            display: block;
                        }
                    }

                    &.ant-table-column-sorter-down {
                        svg {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
