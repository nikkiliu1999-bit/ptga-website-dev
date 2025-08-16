<template>
  <div class="service-agreement">
    <div class="agreement-header">
      <div class="container">
        <h1>TGA评级服务协议</h1>
        <p>委托方将藏品送至TGA评级，即表示委托方确认其已阅读TGA评级服务条款，并同意遵守以下服务条款</p>
        <div class="last-update">最后更新日期：2025年6月15日</div>
      </div>
    </div>
    
    <div class="agreement-content container">
      <div class="agreement-navigation">
        <div class="nav-header">协议目录</div>
        <ul>
          <li v-for="(section, index) in sections" :key="index">
            <a :href="'#section-' + (index + 1)">{{ index + 1 }}. {{ section.title }}</a>
          </li>
        </ul>
      </div>
      
      <div class="agreement-text">
        <div class="intro-text">
          <p>本服务协议（以下简称"协议"）由委托方（以下简称"您"）与上海潮评科技有限公司（以下简称"TGA评级"）共同订立。在您提交藏品进行评级服务前，请务必仔细阅读本协议的全部条款。</p>
          <p class="important-note"><i class="fas fa-exclamation-circle"></i> 重要提示：提交藏品即表示您已充分理解并同意本协议的所有条款，包括责任限制和争议解决条款。</p>
        </div>
        
        <div v-for="(section, index) in sections" :key="index" :id="'section-' + (index + 1)" class="agreement-section">
          <h2>{{ index + 1 }}. {{ section.title }}</h2>
          <div v-html="section.content"></div>
        </div>
        
        <div class="signature-section">
          <div class="signature-line"></div>
          <div class="signature-label">委托方签字/盖章：</div>
          <div class="signature-date">日期：</div>
        </div>
        
        <div class="agreement-footer">
          <p>上海潮评科技有限公司（TGA评级）</p>
          <p>地址：上海市闵行区平阳路258号1层</p>
          <p>联系电话：400-888-8888</p>
          <p>电子邮箱：service@tga.com</p>
        </div>
      </div>
    </div>
    
    <div class="agreement-actions">
      <button class="btn-print" @click="printAgreement"><i class="fas fa-print"></i> 打印协议</button>
      <button class="btn-download" @click="downloadAgreement"><i class="fas fa-download"></i> 下载PDF</button>
      <button class="btn-agree" @click="agreeToTerms"><i class="fas fa-check-circle"></i> 我同意以上条款</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceAgreement',
  data() {
    return {
      sections: [
        {
          title: "协议确认与风险承担",
          content: `<p>委托方自愿将送评件交付鉴定方进行鉴定、评级，委托方确认本协议的约定是其真实的意思表示，其了解送评件送鉴过程中可能存在的风险，并愿意按照本协议约定进行风险承担。</p>`
        },
        {
          title: "鉴定方责任与授权",
          content: `<p>鉴定方受委托方委托，根据鉴定方在公司网页(网页地址)不时公布及更新的鉴定规则，对其送鉴的物品进行真假鉴定、品相评级并包装。鉴定方保证不在未经委托人授权情况下对委托物品等送评件作任何外观的改变、清理，经委托人授权下的改变、清理行为所导致的任何损失和责任均由委托方自行承担。</p>`
        },
        {
          title: "潮玩评级时效",
          content: `
            <div class="timeline-section">
              <div class="timeline-item">
                <div class="timeline-content">
                  <h3>标准评级时效</h3>
                  <p>标准评级签收后25工作日左右(可能快，可能慢，不保证时效)</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-content">
                  <h3>旗舰评级时效</h3>
                  <p>P旗舰评级签收后25工作日内</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-content">
                  <h3>定制评级时效</h3>
                  <p>定制评级签收后5工作日内</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-content">
                  <h3>关于时效的说明</h3>
                  <p>签收后，后一工作日算为进入时效的第一工作日，以标准评级为例，一工作日内完成评级指的是签收后最晚第二工作日完成评级</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-content">
                  <h3>关于签收说明</h3>
                  <p>签收并非指的快递到达时间，而是指的是TGA评级将快递与对应订单确认后进行登记(此时订单会显示进入评级中)；如若TGA评级无法将快递与订单对应(例如快递到达时无该快递单号订单或订单支付金额、数量等有误)，则需要等客户通过填写/更正快递单号、主动联系客服、补订单等方式后，TGA评级完成快递与订单对应，进行快递签收(评级时效以此签收日开始计时)</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-content">
                  <h3>评级时效范围</h3>
                  <p>评级时效指的是完成评级所需时长(完成评级后会订单状态进入已发货，可自主查询评级分数)，快递物流揽收、运输时间不包括在此之内</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-content">
                  <h3>TGA评级超时补偿</h3>
                  <p>以赠送优惠券的方式，补偿超档位与上一档位之间的差价(例如，一单标准评级订单在第六工作日完成，则TGA评级需要补偿一张赠送优惠券即一单标准评级订单与pro评级订单的差价)</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-content">
                  <h3>不可抗力条款</h3>
                  <p>若因不可抗力导致藏卡评级不能正常工作、不能按照约定时间完成评级，TGA评级会及时通知，并将不能按时完成评级的原因告知。在不可抗力消失后，TGA评级会及时履行卡片评级。在此种情况下，TGA评级对其无法按照约定时间完成评级的行为不承担任何违约责任。上述所称的不可抗力包括但不限于台风、地震、洪水、冰雹、火灾、疫情等不能预见、不能避免且不能克服的客观情况。</p>
                </div>
              </div>
            </div>
          `
        },
        {
          title: "服务费与委托方保证",
          content: `
            <p>鉴定方将根据其认定的公允市场价值确定服务内容（送鉴类型、服务类型等)和服务费。所有服务的收费标准，均按照鉴定方进入鉴定流程、评估收费根据公示收费标准进行。</p>
            <div class="highlight-box">
              <h3>委托方保证：</h3>
              <ul>
                <li>其送评件为其合法所有或其有合法授权，其来源和送鉴符合相关法律法规的规定且不侵害任何第三方的合法权益;鉴定方接受委托将不会侵犯任何第三人的权利，不会违反任何相关法律法规，否则，所有责任和后果均由委托方承担，如造成鉴定方遭受任何损失的，委托方应当与以赔偿。</li>
                <li>无论委托方是否为第三方而向鉴定方提交送评件，委托方对送评单中所述的服务内容、描述以及本协议项下的全部权利和义务承担全部责任，委托方将被视作独立的与鉴定方缔约的主体。</li>
                <li>在鉴定方收到送评件并确认无误之前，送评件的灭失或者毁损风险均由委托方承担。</li>
              </ul>
            </div>
          `
        },
        {
          title: "风险承担与赔付承诺",
          content: `
            <p>委托方确认，部分送评件因委托方将其提供给鉴定方时的状态、性质(如较薄、易碎)等因素而较易损坏，使搬运时合理谨慎仍易损坏，鉴定方对送评件签收前发生的损坏不承担任何责任。鉴定方对所有签收并检验时确定完好的委托方的送评件负有谨慎保管责任。</p>
            <div class="warning-box">
              <h3><i class="fas fa-exclamation-triangle"></i> 赔付承诺：</h3>
              <p>我司评级封装的物品，经我司复检后确认出错，我司将按照该潮玩对应的市场价值赔付，但不超出对应的鉴定服务等级最高赔偿上限。</p>
              <p><strong>重要声明:</strong> 客户在此同意，由于所有评级件均系客户财产，不是TGA生产，所以TGA只承担因工作失误导致的相应费用，对执行本条款、由本条款引发或与本条款相关的任何争议均适用于《中华人民共和国民法典》等相关法律法规。同时，TGA针对互相勾结、伪造虚假成交记录、严重脱离物品本身市价进行索赔的行为，TGA也会通过法律手段维护我司合法权益。</p>
            </div>
          `
        },
        {
          title: "不赔付情况",
          content: `
            <div class="exclusion-box">
              <h3>TGA评级在以下情况不承担赔付责任：</h3>
              <ul>
                <li>经我司评级密封的密封包装盒被拆开清洗、篡改等任何改变潮玩的原貌</li>
                <li>因存放环境影响而导致的评级件的变化这类变化包括但不限干斑点、受潮、PVC污染、变色和锈蚀</li>
                <li>未标注的版别溢价和由于输入导致的标签文字信息明显错误等</li>
              </ul>
            </div>
          `
        },
        {
          title: "开盒鉴定条款",
          content: `
            <p>我公司仅支持未装盒潮玩等收评鉴定，如果委托方的送评件是装盒潮玩或未开封盲盒，委托方默认并同意鉴定方开盒并按照鉴定方的标准进行鉴定评级。对此，鉴定方须将送评件从盒中取出，委托方同意免除并放弃追究鉴定方就从盒中取出送评件而导致的任何损失或损害。因鉴定方开盒鉴定而导致的任何损害和后果均由委托方自行承担。</p>
          `
        },
        {
          title: "终止鉴定流程",
          content: `
            <p>委托方向鉴定方提交送评件，即默认为同意鉴定。如果委托方在提交送评件之后拟终止鉴定，则应在鉴定方通知确认收货后的1天之内提出，否则鉴定方将进入鉴定流程，并且无论此后是否终止后续鉴定评级流程，鉴定方将按照收费标准正常收取鉴定评级费用。</p>
          `
        },
        {
          title: "费用与留置权",
          content: `
            <p>除了鉴定方无法确定真假的潮玩以及疑问潮玩之外委托方向鉴定方支付的费用将不予退还。同时，如果委托方存在到期未付的款项，则鉴定方有权依法留置委托方的任何送评件或其他物品，无论到期未付款项是否与该送评件或物品有关。经鉴定方催告60日后委托方仍不支付相应款项的，鉴定方可自行处理送评件或其他物品，由此获得的收益优先用于抵扣委托方拖欠的款项，如有余额的，由鉴定方退还给委托方，如不足以清偿拖欠款项的，鉴定方可继续向委托方追索差额部分。</p>
          `
        },
        {
          title: "鉴定时间免责",
          content: `
            <p>鉴定方将尽量根据其网站上公布的期限提供服务，委托方同意不就鉴定方未能在公告时间内完成鉴定评级而追究鉴定方的任何责任。</p>
          `
        },
        {
          title: "验收与反馈时限",
          content: `
            <p>委托方在收到鉴定方返还的送评件后，应当立即逐件进行检验。若发现任何损坏，委托方应当在收到送评件后3天内反馈给鉴定方，否则视为同意接收返还的送评件。若发现任何标签信息错误，应按照第十五条约定的方式处理。无论如何，鉴定方承担的任何赔偿责任均不超过第六条规定的限额。</p>
          `
        },
        {
          title: "技术鉴定风险",
          content: `
            <p>鉴于送评件的易损性，委托方确认，鉴定方鉴定或评级所用的技术可能会导致送评件出现新的瑕疵或损坏，委托方同意不就上述送评件出现新的瑕疵或损坏而向鉴定方追究责任，除非上述新的瑕疵或损坏是由于鉴定方的故意或重大过失行为而造成的。但尽管如此，委托方确认并同意，所有送评件因为铸造工艺受限或后期保存环境影响，极易产生后期表面污浊或附着物等情况，如果在鉴定方鉴定评级过程中出现上述情况，鉴定方将免于承担任何责任。</p>
          `
        },
        {
          title: "标签错误纠正",
          content: `
            <p>若鉴定方提供的服务中存在标签信息错误，则委托方同意将送评件交回鉴定方予以纠正，相应邮费由鉴定方承担。委托方同意补偿、保护并使鉴定方免于承担与委托方未能遵守本条款而直接或间接导致的各种诉求、责任、索赔以及费用。需要特别说明的是，如果标签信息明显销误，任何主体溢价购买时，鉴定方对此不承担赔偿等法律责任。</p>
          `
        },
        {
          title: "鉴定结果认可与重评",
          content: `
            <p>鉴定方所提供的鉴定结果或相关报告，是鉴定方根据现有条件和鉴定方规范的鉴定流程得出的，委托方委托鉴定方进行鉴定，视为认可鉴定方专业水准和操作流程并认同鉴定方出具的结果：如委托方对结果有异议，或是鉴定方出具的结果与其他任意第三方出具的结果有出入的，委托方不得据此直接要求鉴定方承担任何责任。</p>
            <p>应委托方申请，鉴定方可根据鉴定规则为委托方提供重评服务并作出处理。针对金银锭类藏品的修补问题，本公司将始终秉持"宁可错杀，绝不放过"的高标准，尽最大可能保护客户权益。但对于现有科技手段均无法识别的瑕疵，将不承担相关赔偿责任，但会给予三倍评级费用的补偿。无论如何，鉴定方承担的任何赔偿责任均不超过第五条规定的限额。</p>
          `
        },
        {
          title: "复检申请流程",
          content: `
            <p>委托方对我公司已评级件结果有异议时须带盒申请复检，鉴定方将依据上述第八条规定按重评处理，如重评结果一致的将按照正常流程换盒并收取委托方服务费，如评级结果不一致(假币入盒、瑕疵未标)等情况，我们将依据售后条例进入售后流程，由此产生的费用由鉴定方承担。</p>
            <div class="note-box">
              <p><strong>注:</strong> 委托方确认委托方申请复检时须原盒寄给鉴定方，若包装盒出现被拆开鉴定方一律按重评服务。</p>
            </div>
          `
        },
        {
          title: "责任限额",
          content: `
            <p>除本协议明确约定的或者鉴定规则明确规定的具体情形之外，鉴定方因任何事由、作为、不作为或其他情况而应对委托方或任何第三方所承担的赔偿责任，累计不超过委托方为送评单所订购的服务实际支付或应付的金额。</p>
          `
        },
        {
          title: "数据与知识产权",
          content: `
            <p>鉴定方将收集送评件的相关数据，为其制作数字图像及建模，为其编辑与品相、边框等级别等相关资料。委托方特此授权鉴定方及其关联方收集上述数据并制作上述图像、编辑上述资料:同时，委托方特此明确，鉴定方是上述数据、图像和资料的所有权人，拥有为任何目的使用和商业化等全部权益，鉴定方行使权利时无需取得委托方的任何同意、无需向委托方支付任何费用。委托方代表其自身及任何第三方无条件地、不可撤销地向鉴定方转让委托方及任何有关第三方对于数据、图像及资料拥有的现在的及将来的全部权益。</p>
          `
        },
        {
          title: "争议解决",
          content: `
            <p>本协议在履行过程中发生的争议，双方均应友好协商解决，协商不成的，任何一方均有权向鉴定方所在地人民法院提起诉讼。</p>
          `
        },
        {
          title: "营销授权",
          content: `
            <p>用户同意授权手机号并注册小程序即同意接收我公司营销短信。</p>
          `
        },
        {
          title: "协议修改与法律约束",
          content: `
            <div class="final-note">
              <p><strong>注意：</strong> 以上送评说明及约定条款内容，TGA评级有权随时进行调整，客户需关注TGA小程序内容，届时将不另行通知。以上评级条款约定委托方送评后即具有法律效应委托方并同意遵守履行。</p>
              <p>凡因本服务条款有关的任何争议，双方应先友好解决，协商不成，应提交上海潮评科技有限公司所在地法院提起诉讼。诉讼裁决为终局裁决，对双方均有约束力。</p>
            </div>
          `
        }
      ]
    }
  },
  methods: {
    printAgreement() {
      window.print();
    },
    downloadAgreement() {
      alert("PDF下载功能需要后端支持，请联系技术团队实现");
    },
    agreeToTerms() {
      this.$router.push('/submit');
    }
  }
}
</script>

<style scoped>
.service-agreement {
  background: #f8f9fc;
  min-height: 100vh;
  padding-bottom: 60px;
}

.agreement-header {
  background: linear-gradient(135deg, #1a2a6c 0%, #2a4365 100%);
  color: white;
  padding: 70px 0 40px;
  text-align: center;
  margin-bottom: 40px;
}

.agreement-header h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.agreement-header p {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 25px;
  opacity: 0.9;
}

.last-update {
  font-size: 0.95rem;
  opacity: 0.8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.agreement-content {
  display: flex;
  gap: 30px;
}

.agreement-navigation {
  width: 280px;
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.nav-header {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a2a6c;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 2px solid #f0f2f7;
}

.agreement-navigation ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.agreement-navigation li {
  margin-bottom: 12px;
}

.agreement-navigation a {
  color: #444;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s;
  display: block;
  padding: 8px 10px;
  border-radius: 6px;
}

.agreement-navigation a:hover {
  background: #f0f5ff;
  color: #1a56db;
}

.agreement-text {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.intro-text {
  padding-bottom: 25px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.intro-text p {
  line-height: 1.8;
  color: #444;
}

.important-note {
  background: #fff8e1;
  border-left: 4px solid #ffc107;
  padding: 15px 20px;
  border-radius: 0 8px 8px 0;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
}

.important-note i {
  color: #ff9800;
  font-size: 1.2rem;
  margin-right: 12px;
  margin-top: 3px;
}

.agreement-section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f0f2f7;
}

.agreement-section h2 {
  font-size: 1.6rem;
  color: #1a2a6c;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f2f7;
}

.agreement-section p, .agreement-section li {
  line-height: 1.8;
  color: #444;
  margin-bottom: 15px;
}

.agreement-section ul {
  padding-left: 25px;
  margin: 15px 0;
}

.timeline-section {
  margin: 25px 0;
}

.timeline-item {
  margin-bottom: 20px;
  padding-left: 30px;
  position: relative;
}

.timeline-item:before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #1a56db;
}

.timeline-content {
  background: #f8f9ff;
  padding: 20px;
  border-radius: 8px;
  border-left: 3px solid #1a56db;
}

.timeline-content h3 {
  font-size: 1.2rem;
  color: #1a2a6c;
  margin-bottom: 10px;
}

.highlight-box {
  background: #e8f4ff;
  border-left: 4px solid #1a56db;
  padding: 20px;
  border-radius: 0 8px 8px 0;
  margin: 20px 0;
}

.warning-box {
  background: #fff8e1;
  border-left: 4px solid #ffc107;
  padding: 20px;
  border-radius: 0 8px 8px 0;
  margin: 20px 0;
}

.warning-box i {
  color: #ff9800;
  margin-right: 8px;
}

.exclusion-box {
  background: #ffebee;
  border-left: 4px solid #f44336;
  padding: 20px;
  border-radius: 0 8px 8px 0;
  margin: 20px 0;
}

.note-box {
  background: #e0f7fa;
  border-left: 4px solid #00bcd4;
  padding: 15px;
  border-radius: 0 8px 8px 0;
  margin: 20px 0;
}

.final-note {
  background: #f3e5f5;
  border-left: 4px solid #9c27b0;
  padding: 20px;
  border-radius: 0 8px 8px 0;
  margin: 20px 0;
}

.signature-section {
  margin: 50px 0 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  text-align: right;
}

.signature-line {
  width: 300px;
  height: 1px;
  background: #444;
  margin: 40px 0 10px auto;
}

.signature-label {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.signature-date {
  font-size: 1.1rem;
}

.agreement-footer {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  text-align: center;
  font-size: 1.1rem;
  color: #555;
}

.agreement-footer p {
  margin: 8px 0;
}

.agreement-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  padding: 0 20px;
}

.btn-print, .btn-download, .btn-agree {
  padding: 14px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.btn-print i, .btn-download i, .btn-agree i {
  margin-right: 10px;
  font-size: 1.2rem;
}

.btn-print {
  background: #e0e0e0;
  color: #333;
}

.btn-print:hover {
  background: #d0d0d0;
}

.btn-download {
  background: #2196f3;
  color: white;
}

.btn-download:hover {
  background: #0d8bf2;
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(33, 150, 243, 0.3);
}

.btn-agree {
  background: #4caf50;
  color: white;
}

.btn-agree:hover {
  background: #3d8b40;
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);
}

@media (max-width: 992px) {
  .agreement-content {
    flex-direction: column;
  }
  
  .agreement-navigation {
    width: 100%;
    position: static;
  }
}

@media (max-width: 768px) {
  .agreement-header h1 {
    font-size: 2rem;
  }
  
  .agreement-header p {
    font-size: 1rem;
  }
  
  .agreement-text {
    padding: 25px;
  }
  
  .agreement-actions {
    flex-direction: column;
    gap: 15px;
  }
  
  .btn-print, .btn-download, .btn-agree {
    width: 100%;
    justify-content: center;
  }
}
</style>