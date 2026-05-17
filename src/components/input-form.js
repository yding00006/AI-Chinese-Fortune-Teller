/**
 * input-form.js — User input forms for each divination method
 * Dynamically renders the appropriate form fields based on selected method
 */

const InputForm = {
  currentMethod: null,

  init() {
    this.formSection = document.getElementById('input-section');
    this.formContainer = document.getElementById('input-form');
    this.formTitle = document.getElementById('form-title');
  },

  showForMethod(method) {
    this.currentMethod = method;
    if (!this.formSection || !this.formContainer) return;

    this.formSection.style.display = 'block';
    this.formTitle.textContent = `${method.cn} — ${method.name}`;

    this.formContainer.innerHTML = this.buildFormFields(method);
    this.bindSubmit();

    this.formSection.scrollIntoView({ behavior: 'smooth' });
  },

  buildFormFields(method) {
    let fields = '';

    if (method.inputs.includes('birthdate')) {
      fields += `
        <div class="form-group">
          <label for="birth-date">Birth Date 出生日期</label>
          <input type="date" id="birth-date" name="birthDate" required />
        </div>
      `;
    }

    if (method.inputs.includes('birthtime')) {
      fields += `
        <div class="form-group">
          <label for="birth-time">Birth Time 出生时辰</label>
          <select id="birth-time" name="birthTime" required>
            <option value="">Select time / 选择时辰</option>
            <option value="23-01">子时 Zǐ (23:00–01:00)</option>
            <option value="01-03">丑时 Chǒu (01:00–03:00)</option>
            <option value="03-05">寅时 Yín (03:00–05:00)</option>
            <option value="05-07">卯时 Mǎo (05:00–07:00)</option>
            <option value="07-09">辰时 Chén (07:00–09:00)</option>
            <option value="09-11">巳时 Sì (09:00–11:00)</option>
            <option value="11-13">午时 Wǔ (11:00–13:00)</option>
            <option value="13-15">未时 Wèi (13:00–15:00)</option>
            <option value="15-17">申时 Shēn (15:00–17:00)</option>
            <option value="17-19">酉时 Yǒu (17:00–19:00)</option>
            <option value="19-21">戌时 Xū (19:00–21:00)</option>
            <option value="21-23">亥时 Hài (21:00–23:00)</option>
            <option value="unknown">Unknown 不确定</option>
          </select>
        </div>
      `;
    }

    if (method.inputs.includes('gender')) {
      fields += `
        <div class="form-group">
          <label>Gender 性别</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="gender" value="male" required />
              <span>Male 男</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="gender" value="female" />
              <span>Female 女</span>
            </label>
          </div>
        </div>
      `;
    }

    if (method.inputs.includes('question')) {
      fields += `
        <div class="form-group">
          <label for="question">Your Question 你的问题</label>
          <textarea
            id="question"
            name="question"
            rows="4"
            placeholder="What guidance do you seek? 你寻求什么指引？"
            required
          ></textarea>
        </div>
      `;
    }

    if (method.inputs.includes('face-description')) {
      fields += `
        <div class="form-group">
          <label for="face-shape">Face Shape 脸型</label>
          <select id="face-shape" name="faceShape" required>
            <option value="">Select shape / 选择脸型</option>
            <option value="oval">Oval 椭圆形</option>
            <option value="round">Round 圆形</option>
            <option value="square">Square 方形</option>
            <option value="heart">Heart 心形</option>
            <option value="long">Long/Oblong 长形</option>
            <option value="diamond">Diamond 菱形</option>
          </select>
        </div>
        <div class="form-group">
          <label for="features">Notable Features 显著特征</label>
          <textarea
            id="features"
            name="features"
            rows="3"
            placeholder="Describe your prominent facial features (e.g., high forehead, thick eyebrows, wide-set eyes)&#10;描述你的显著面部特征（例如：额头高、眉毛浓、两眼距离宽）"
          ></textarea>
        </div>
      `;
    }

    if (method.inputs.includes('interest-area')) {
      fields += `
        <div class="form-group">
          <label for="interest">Area of Interest 关注领域</label>
          <select id="interest" name="interestArea">
            <option value="general">General Overview 综合</option>
            <option value="career">Career 事业</option>
            <option value="relationships">Relationships 感情</option>
            <option value="health">Health 健康</option>
            <option value="wealth">Wealth 财运</option>
          </select>
        </div>
      `;
    }

    // Optional question for all methods
    if (!method.inputs.includes('question')) {
      fields += `
        <div class="form-group">
          <label for="optional-question">Additional Question (Optional) 补充问题（可选）</label>
          <textarea
            id="optional-question"
            name="optionalQuestion"
            rows="2"
            placeholder="Any specific question? 有具体问题吗？"
          ></textarea>
        </div>
      `;
    }

    fields += `
      <button type="submit" class="submit-btn" id="submit-reading">
        Reveal My Reading 开始解读
      </button>
    `;

    return fields;
  },

  bindSubmit() {
    const submitBtn = document.getElementById('submit-reading');
    if (!submitBtn) return;

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const formData = this.collectFormData();
      if (this.validate(formData)) {
        this.submitReading(formData);
      }
    });
  },

  collectFormData() {
    const data = { method: this.currentMethod.id };
    const fields = this.formContainer.querySelectorAll('input, select, textarea');
    fields.forEach((field) => {
      if (field.type === 'radio') {
        if (field.checked) data[field.name] = field.value;
      } else {
        if (field.name) data[field.name] = field.value;
      }
    });
    return data;
  },

  validate(data) {
    const method = this.currentMethod;
    if (method.inputs.includes('birthdate') && !data.birthDate) {
      alert('Please enter your birth date. 请输入您的出生日期。');
      return false;
    }
    if (method.inputs.includes('birthtime') && !data.birthTime) {
      alert('Please select your birth time. 请选择您的出生时辰。');
      return false;
    }
    if (method.inputs.includes('gender') && !data.gender) {
      alert('Please select your gender. 请选择您的性别。');
      return false;
    }
    if (method.inputs.includes('question') && !data.question?.trim()) {
      alert('Please enter your question. 请输入您的问题。');
      return false;
    }
    return true;
  },

  submitReading(data) {
    // TODO: In the future, this will send data to the Claude API
    // For now, show placeholder results
    if (typeof ResultsDisplay !== 'undefined') {
      ResultsDisplay.showPlaceholder(data, this.currentMethod);
    }
  },
};
