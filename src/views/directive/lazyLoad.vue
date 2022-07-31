<template>
 <div class="page">
  <div class="img-item" v-for='item in imgArr'>
    <img v-lazy="item" />
  </div>
 </div> 
</template>

<script>
  export default {
    data() {
      return {
        text: '',
        imgArr: ['https://img1.baidu.com/it/u=1966616150,2146512490&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1657299600&t=b4448d54d1eafccfd03049333ad26163',
        'https://img1.baidu.com/it/u=3217543765,3223180824&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1657299600&t=a030250e31bd358463c4afa847ca714f',
        'https://www.baidu.com/link?url=092nl-SBsDYWozSgaEs-80aQ2WEn50SJ6cTxcuzPidqBunu9b5hLBGJIxfX-5qVwUE33wV_wDt14-B6h1FjkEmktmQhV6pfK29P0f6F1-PUojJ-XHHAR6RknNh90JlJhMFbXU2qAet1GKwpUVg1CebC6xy81tmBQ-U0wVTkHjsqD2sndg2KIXoBO2upXOdtZobYA3e40znrfAPAfz4AIBce7vhHXS9FyFxLukxtW-jGJiEu-iKQr6qt5uU_QpmuZLoo1grIWLj4tshiUw2Sah-1U0jhrGpeHgHhWRxFMrtiP-KQKnkDPS92_ZmUrMCPRz2h3Q1qocxWVrVXmQtqF-R9Ohhkn1bqsCuhDk2N2bCSiLrWTkT1gwM9scCziIKLowf5gBGHX7MiS-J4BDK_XEPCokd525ZXK8IuItbYUfXqzbOPI0PA8y1R2kTIzJgm9ls45KKVA6VilDnPLCJAdlBwLkAkyp1f9CJEz5LRUzUA3WwzS8yayYSvqubEOe_m5M6oi89JQbE54sGQAOOCftUpUEeFvsmNCWAO_adGT7gHRaaxIveey89ewz9unARiCBMSGjjMOJ55j03OuCsxEnZjDcRExt-flyaiLyVnbN7D6BOMxQnoupBIgu1wyocpq&wd=&eqid=9640da250001fd230000000462c683f5',
        'https://www.baidu.com/link?url=nmBOBFZI0xdkE8nLDR9LTIrSiFJ145ogI7R9zM8Tt6IVNKqhZOr7AERfYm8PyBaDNscquV_zzh_437Tk7tEtkA8wNw7a3oVXac42sUUkuJ2uJ8qK-SSkYVrduV0_-pWolYeJOmeRifKNKBsRFXPj5CqKBOERVntx8p3ZHo_WFVJxvtFbIVzoZKKgjufNOebzkGO2wSuH_kzgwzV3sdwOX5DYP4aX2keZ6svJY0tyGsz0xwBimFXzTbatSFPXwskKgvvn5zzUPGJBC3-JxlOVSSbKkrzjhawsnYvBXFMG3iVTGESuG7hdi4EQhSSQ433OZtoKCBNVWfU9uS_4UNKbiJdDVs9kKleZiJ5pw5ZQKrq__afV2rxOpOjiYex3VGI2oeUm5Q68ZmccO1tJ1OP5MV_cDpRXuNgOeAeZYBjbsojYSjnaFOs2ZZCSloaQk20ZaNCiMYZMxuNDuzRB9XrhV09MlzezkBzrydrLsva2abMs72CGmRDt96TkZdQraj-1N7pmZFgkXG94-22e3LvILgecqJBHjv4lFjKpEDG6zYURFU-dpojVBAWZ5cSlazTbbjSZU9BRBD1xtygUVVS_ugBIHjBaUCjGLPnUsFt7Wj7KFG_IE7EkINW4rFjY-f8ZyQk1HyxlUXdY_xlb2dOT2DKffI5AFr6w5a8NxaYBIYm&wd=&eqid=9640da250001fd230000000462c683f5',
        'https://img1.baidu.com/it/u=2003496092,3295249130&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
        'https://img1.baidu.com/it/u=745998857,124348167&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
        'https://img1.baidu.com/it/u=3164998783,2199444470&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333',
        'https://img0.baidu.com/it/u=2521851051,2189866243&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
        'https://img1.baidu.com/it/u=247476914,1703490424&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375',
        'https://img1.baidu.com/it/u=247476914,1703490424&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375',
        'https://img2.baidu.com/it/u=3573340222,719722755&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=784',
        'https://img1.baidu.com/it/u=153079648,553512087&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=356',
        ]
      }
    },
  }
</script>
<style scoped >
.page {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.img-item {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  
}
img {
  height: 300px;
}
</style>