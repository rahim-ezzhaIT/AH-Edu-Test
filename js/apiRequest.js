// Cool Invoice API URL
const coolInvoiceApiUrl = "https://api.coolinvoice.com";

// Company ID Information
//const companyId = "35dd7101-b33c-43e7-bbd3-6e48b5b92dc2"; //PC HELP CENTER 
//const companyId = "416989DD-1C7E-49E6-AE13-08DCC3900EA7"; //EEN DRIVING SCHOOL LIMITED
const companyId = "B4F6BA1B-E3F1-4CD8-9367-EA9B18734CCF";   //AH EDU GLOBAL LIMITED
const serviceId = 0; // Default Service ID for Contact Us Form

//==============Index Page API Requests Start====================

// Extract Image from wwwroot
const Extract_Image_From_WWWRoot = (image, url) => {
  // 1) drop everything before "wwwroot\"
  var rel = image.replace(/^.*wwwroot\\/, "");
  // 2) convert backslashes to slashes
  rel = rel.replace(/\\/g, "/");
  // 3) build final URL
  return (extractedImage = url + "/" + rel);
};

// Company Detail API 
const getCompanyDetail=async()=>{
    try{
        const response=await fetch(`${coolInvoiceApiUrl}/api/Company/GetCompanyByCompanyId/${companyId}`);
        const companyData=await response.json();
        //console.log("Company Data:",companyData);
        //console.log("Company Data:",companyData);
        $("#company-title").text(companyData.companyName);
        $("#contact-address").text(companyData.address);
        $("#contact-email").text(companyData.companyEmail);
        $("#contact-phone").text(companyData.mobile);
        $("#header-image").attr("src", Extract_Image_From_WWWRoot(companyData.logoUrl, coolInvoiceApiUrl)
      );
    }
    catch(error){
        console.error("Error fetching company details:",error);
    }
}

// Footer API 
const getCompanyFooter=async()=>{
    try{
        const response=await fetch(`${coolInvoiceApiUrl}/api/Content/GetFooterForCompany/${companyId}`);
        const companyFooter=await response.json();
        //console.log("Company Footer:",companyFooter);
        //console.log("Company Footer:",companyFooter);
        $("#footer-image").attr("src", Extract_Image_From_WWWRoot(companyFooter.footerLogoUrl, coolInvoiceApiUrl))
        $("#footer-message").text(companyFooter.subscriptionMessage)
        $("#footer-address").text(companyFooter.address)
        $("#footer-contact").text(companyFooter.contact)
        $("#footer-email").text(companyFooter.email)
        $("#copyright-year").text(companyFooter.copyrightYear)
        $("#footer-company-title").text(companyFooter.companyName)
    }
    catch(error){
        console.error("Error fetching company details:",error);
    }
}

// Who We Serve API 
const getWhoWeServeList=async()=>{
    try{
        const response=await fetch(`${coolInvoiceApiUrl}/api/HighLitedCard/GetAllHighLightedCardsByCompanyId/${companyId}`);
        const whoWeServiceList=await response.json();
        //console.log("Who We Serve:",whoWeServiceList);
        
        var whoWeServeContainer=$("#who-we-serve-container");
        whoWeServeContainer.empty();
        whoWeServiceList.data.forEach((serve)=>{
            whoWeServeContainer.append(`
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="service-item">
                        <h4>${serve.header}</h4>
                        <p class="text-center fw-bold" style="color:#232323; font-size:.9rem">${serve.subHeader}</p>
                        <p class="mb-0" style="text-align:justify;">${serve.description}</p>
                    </div>
                </div>
            `)
        })
    }
    catch(error){
        console.error("Error fetching company details:",error);
    }
}

// Feedback & Testimonial API 
function initTestimonialCarousel() {
    const $carousel = $('#feedback-container');
    
    // Crucial: Destroy the old instance before re-initializing
    if ($carousel.hasClass('owl-loaded')) {
        $carousel.owlCarousel('destroy');
    }

    // Initialize with your required settings
    $carousel.owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 } 
        }
    });
}

const getFeedbackList=async()=>{
    try{
        const response=await fetch(`${coolInvoiceApiUrl}/api/Content/GetFeedbackForCompany/${companyId}`);
        const feedbackList=await response.json();
        //console.log("Feedback:",feedbackList);
        
        var feedbackContainer=$("#feedback-container");
        feedbackContainer.empty();
        feedbackList.forEach((feedback)=>{
            feedbackContainer.append(`
                <div class="item">
                        <div class="testimonial-box d-flex gap-3">
                            <div class="user-img" style="background-image: url(${Extract_Image_From_WWWRoot(feedback.profilePicUrl, coolInvoiceApiUrl)})">
                            </div>
                            <div class="text pl-4">
                                <span class="quote"><i class="fa fa-quote-left"></i></span>
                                <p>${feedback.feeedbackMessage}</p>
                                <p class="name">${feedback.name}</p>
                                <span class="position">${feedback.designation}</span>
                            </div>
                        </div>
                    </div>
            `)
        })
        
        // INITIALIZE THE CAROUSEL HERE!
        initTestimonialCarousel();
    }
    catch(error){
        console.error("Error fetching company details:",error);
    }
}

const getServiceList=async()=>{
  let progress = 0;
  let progressInterval;

  function updateLoader(percent) {
    const circle = document.querySelector("#loader .circle");
    const text = document.querySelector("#loader .percentage-text");
    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${offset}`;
    text.textContent = `${percent}%`;
  }

  function startSmoothLoader() {
    progress = 0;
    updateLoader(progress);
    progressInterval = setInterval(() => {
      if (progress < 99) {
        progress++;
        updateLoader(progress);
      }
    }, 50);
  }

  function finishLoader() {
    clearInterval(progressInterval);
    updateLoader(100);
    setTimeout(() => {
      $("#loader").fadeOut(400);
    }, 1000);
  }

  $("#loader").show();
  startSmoothLoader();

    // duration is used as button text because no ohter field available in api response to accomodate button text. We can use service tag but it is not available in api response.
  try{
      const response=await fetch(`${coolInvoiceApiUrl}/api/Service/GetAllServiceByCompanyId/${companyId}`);
      const serviceList=await response.json();
      console.log("Service:",serviceList);
      // var serviceContainer=$("#our-services-container");
      // serviceContainer.empty();
      // serviceList.forEach((service)=>{
      //     serviceContainer.append(`
      //         <div class="col-12 col-md-6 col-lg-4">
      //             <div class="service-item d-flex flex-column justify-content-between">
      //                 <div class="">
      //                   <h4>${service.serviceName}</h4>
      //                   <img src="${service.imageUrl}" height="200" width="310" alt="${service.serviceName}" class="d-block mx-auto" />
      //                   <p class="mt-3" style="text-align:justify">${service.description}</p>
      //                 </div>

      //                 <div class="d-flex">
      //                     <button onclick="window.open('contact.html', '_blank')" target="_blank" class="main-button w-100">${service.duration}</button> 
      //                 </div>
      //             </div>
      //         </div>
      //     `)
      // })

      const serviceContainer = $("#our-services-container");
      serviceContainer.empty();

      // Helper: decide columns-per-row based on Bootstrap breakpoints
      function getColsPerRow() {
        const w = window.innerWidth;
        if (w >= 992) return 3;    // lg and above
        if (w >= 768) return 2;    // md
        return 1;                  // sm and xs
      }

      // Helper: chunk an array into groups of size n
      function chunkArray(arr, n) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += n) {
          chunks.push(arr.slice(i, i + n));
        }
        return chunks;
      }

      // Render function so we can re-render on resize (keeps last row centered if incomplete)
      function renderServices(list) {
        serviceContainer.empty();
        const perRow = getColsPerRow();
        const rows = chunkArray(list, perRow);

        rows.forEach((chunk, rowIndex) => {
          // If this row is incomplete, center its items. Otherwise keep default layout.
          const incomplete = chunk.length < perRow;
          const rowClass = incomplete ? 'row g-4 justify-content-center' : 'row g-4';
          const $row = $(`<div class="${rowClass}"></div>`);

          chunk.forEach(service => {
            // build column markup
            const col = `
              <div class="col-12 col-md-6 col-lg-4">
                <div class="service-item d-flex flex-column justify-content-between">
                  <div>
                    <h4>${service.serviceName}</h4>
                    <img src="${service.imageUrl}" height="200" width="310" alt="${service.serviceName}" class="d-block mx-auto" />
                    <p class="mt-3" style="text-align:justify">${service.description}</p>
                  </div>
                  <div class="d-flex">
                    ${(service.serviceName === "Direct Application Support" || service.serviceName === "Student Finance & Scholarship Guidance") ?
                      `<button onclick="window.open('admissions-info.html', '_blank')" target="_blank" class="main-button w-100">${service.duration}</button>`
                      :
                      `<button onclick="window.open('contact.html', '_blank')" target="_blank" class="main-button w-100">${service.duration}</button>`
                    }
                  </div>
                </div>
              </div>
            `;
            $row.append(col);
          });

          serviceContainer.append($row);
        });
      }

      // initial render + safe error handling if serviceList is not as expected
      try {
        if (!Array.isArray(serviceList)) throw new Error('serviceList is not an array');
        renderServices(serviceList);
      } catch (err) {
        console.error('Failed to render services:', err);
        serviceContainer.append('<div class="col-12">Unable to load services.</div>');
      }

      // Re-render on window resize with debounce so last row re-centers when viewport changes.
      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => renderServices(serviceList), 120);
      });
  }
  catch(error){
      console.error("Error fetching company details:",error);
  }
  finally {
    finishLoader();
  }
}

const getChooseUsList=async()=>{
  let chooseUsProgress = 0;
  let chooseUsProgressInterval;
  const CHOOSE_US_LOADER_ID = "#choose-us-loader";

  function updateChooseUsLoader(percent) {
      // FIX: Scoping the selectors to the specific loader ID
      const loaderElement = document.querySelector(CHOOSE_US_LOADER_ID);
      
      // Use the loaderElement as the root for querySelector
      const circle = loaderElement ? loaderElement.querySelector("#choose-us-loader .circle") : null;
      const text = loaderElement ? loaderElement.querySelector("#choose-us-loader .percentage-text") : null;
      
      const radius = 15.9155;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;

      if (circle && text) { 
          circle.style.strokeDasharray = `${circumference}`;
          circle.style.strokeDashoffset = `${offset}`;
          text.textContent = `${percent}%`;
      }
  }

  function startChooseUsSmoothLoader() {
      chooseUsProgress = 0;
      updateChooseUsLoader(chooseUsProgress);
      chooseUsProgressInterval = setInterval(() => {
          if (chooseUsProgress < 99) {
              chooseUsProgress++;
              updateChooseUsLoader(chooseUsProgress);
          }
      }, 50);
  }

  function finishChooseUsLoader() {
      clearInterval(chooseUsProgressInterval);
      updateChooseUsLoader(100);
      setTimeout(() => {
          $(CHOOSE_US_LOADER_ID).fadeOut(400);
      }, 1000);
  }
  $(CHOOSE_US_LOADER_ID).show();
  startChooseUsSmoothLoader();
  try{
      const response=await fetch(`${coolInvoiceApiUrl}/api/Feature/GetFeaturesByCompanyId/${companyId}`);
      const chooseUsList=await response.json();
      //console.log("Why Choose Us:",chooseUsList);
      
      // This section is used if we want to add description from api
      chooseUsList.data.forEach((choose)=>{
          $("#choose-us-header").append(`${choose.description}`);
      })

      var chooseUsDetailContainer=$("#choose-us-detail-container");
      chooseUsDetailContainer.empty();

      const chooseUsDetailList=await fetch(`${coolInvoiceApiUrl}/api/FeatureDetails/GetFeatureDetailsByCompanyId/${companyId}`);
      const chooseUsDetail=await chooseUsDetailList.json();
      //console.log("Choose Us Details:",chooseUsDetail);
      chooseUsDetail.data.forEach((detail)=>{
          chooseUsDetailContainer.append(`
              <div class="col-12 col-md-6 col-lg-3">
                  <div class="service-item d-flex flex-column justify-content-between">
                    <div class="">
                      <h4>${detail.header}</h4>
                      <img src="data:image/jpg;base64,${detail.featureIcon}" height="180" width="250" alt="${detail.header}" class="d-block mx-auto" />
                      <p class="mt-3" style="text-align:justify;">${detail.description}</p>
                    </div>
                  </div>
              </div>
          `)
      })
  }
  catch(error){
      console.error("Error fetching company details:",error);
  }
  finally {
        // 3. Stop progress and hide loader
        finishChooseUsLoader();
    }
}

//==============Index Page API Requests End========================
//=============='Our service' Page API Requests Start==============



//==============Our service' Page API Requests End=================
//=============='Student' Page API Requests Start==================



//==============Student' Page API Requests End=====================
//=============='About Us' Page API Requests Start=================
const getAboutUsData = async () => {
  try {
    const res = await fetch(`${coolInvoiceApiUrl}/api/Content/GetAboutUsForCompany/${companyId}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    //console.log("About Us data:", data);

    const about = data?.aboutUs || {};
    const aboutUsContent = data?.aboutUs.header || [];
    const picturePath = about.pictureUrl; 
    const aboutUsImageAltText=data?.aboutUs.subHeader || "About Us Image";
    const fallbackImage = "assets/images/interior-design-left-image.jpg";

    const imageUrl = picturePath
      ? Extract_Image_From_WWWRoot(picturePath, coolInvoiceApiUrl)
      : fallbackImage;

    $("#about-header").text("Our Mission");
    $("#about-image").attr("src", imageUrl);
    $("#about-image").attr("alt", aboutUsImageAltText);
    $("#about-us-content").empty().append($("<p>").text(aboutUsContent));
    $("#contact-us-header").text(aboutUsContent);
  } catch (error) {
    console.error("Error fetching About Us data:", error);
    // graceful fallback UI
    $("#about-image").attr("src", "assets/images/interior-design-left-image.jpg");
    $("#about-us-content").empty().append($("<p>").text("Failed to load About Us content. Please try again later."));
  }
};

const normalizeUrl = (u) => u.replace(/([^:]\/)\/+/g, "$1");

function initStaffCarousel() {
  const $carousel = $("#staff-carousel");

  if ($carousel.hasClass("owl-loaded")) {
    $carousel.owlCarousel("destroy");
  }

  $carousel.owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    autoplay: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  });
}

const loadStaffTestimonials = async () => {
  try {
    const res = await fetch(`${coolInvoiceApiUrl}/api/Employee/GetAllStaffs/${companyId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const staffs = await res.json();

    const $container = $("#staff-carousel");
    $container.empty();

    const fallbackImage = "assets/images/testimonial-author-01.jpg";

    staffs.forEach((st) => {
      let imgUrl = st.imageUrl
        ? normalizeUrl(Extract_Image_From_WWWRoot(st.imageUrl, coolInvoiceApiUrl))
        : fallbackImage;

      const itemHtml = `
        <div class="item testimonial-item h-100">
          <div class="d-flex">
            <img class="float-start" src="${imgUrl}" alt="${(st.fullName || "Staff").replace(/"/g, "")}">
            <div class="">
              <h4>${st.fullName || ""}</h4>
              <span>${st.designation || ""}</span>
            </div>
          </div>
          <p>${st.designation ? st.designation : ""}</p>
        </div>
      `;

      $container.append(itemHtml);
    });

    initStaffCarousel();
  } catch (error) {
    console.error("Error loading staff testimonials:", error);
    $("#staff-carousel").empty().append(`
      <div class="item testimonial-item h-100">
        <div class="d-flex">
          <img class="float-start" src="assets/images/testimonial-author-01.jpg" alt="Team">
          <div class="">
            <h4>Our Team</h4>
            <span>Dedicated Staff</span>
          </div>
        </div>
        <p>Team details are currently unavailable.</p>
      </div>
    `);
    initStaffCarousel();
  }
};

$(document).ready(function () {
  loadStaffTestimonials();
});



//==============About Us' Page API Requests End====================
//=============='Contact Us' Page API Requests Start===============
const sendContactUsData = async (serviceId) => {
  function generateQuotationNo() {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `CUSOID-${randomDigits}`;
  }

  $("#contactForm").submit(async function (e) {
    e.preventDefault();

    // Read form values
    const firstName = $('input[name="firstName"]').val().trim();
    const lastName = $('input[name="lastName"]').val().trim();
    const email = $('input[name="email"]').val().trim();
    const phone = $('input[name="phone"]').val().trim();
    const requirementDetails = $('textarea[name="message"]').val().trim();

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !requirementDetails) {
      $("#formResponse").html(
        '<p class="text-danger">Please fill in all required fields.</p>'
      );
      return;
    }

    // Backend expects this payload format
    const zeroGuid = "00000000-0000-0000-0000-000000000000";
    const nowIso = new Date().toISOString();

    const customerPayload = {
      Item1: {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: "",
        ConfirmPassword: "",
        Phone: phone,
        FieldOfStudy: null,
        MaritalStatus: 0,
        DOB: nowIso,
        Gender: 0,
        LeadStatusId: 0,
        ProfileImg: null,
        Customers: {
          CustomerId: zeroGuid,
          CompanyId: companyId,
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Password: "",
          Phone: phone,
          UserName: null,
          UserType: 0,
          MaritalStatus: 0,
          DOB: nowIso,
          Gender: 0,
          CreatedDate: nowIso,
          CreatedBy: null,
          EditedDate: null,
          EditedBy: null,
        },
        CustomersOtherInformation: {
          Id: 0,
          CustomerId: zeroGuid,
          AnnualRevenue: 0,
          AssociatedDeals: null,
          BecomeACustomerDate: nowIso,
          BecomeALeadDate: null,
          LeadStatus: 1,
          CampaignName: null,
          CompanyName: null,
          City: null,
          CompanySize: null,
          ContactOwner: null,
          FieldOfStudy: null,
          Degree: null,
          Industry: null,
          IPCity: null,
          IPCountry: null,
          JobTitle: null,
          LastActivityDate: nowIso,
          LastContacted: null,
        },
        Address: {
          Id: 0,
          AddressType: null,
          EmployeeId: null,
          Houseno: null,
          StreetAddress: null,
          PostCode: null,
          City: null,
          State: null,
          Province: null,
          Country: null,
          IsBillingAndShippingSame: false,
        },
        AddressList: [],
      },
      Item2: "Add",
      Item3: null,
      Item4: null,
      Item5: null,
      Item6: null,
      Item7: null,
    };

    // Disable submit button and show loading
    const $submitBtn = $('#contactForm button[type="submit"]');
    $submitBtn.prop("disabled", true).text("Sending...");
    $("#formResponse").empty();

    try {
      // AJAX call #1 => InsertOrUpdateCustomerDetails
      const res1 = await fetch(`${coolInvoiceApiUrl}/api/Customer/InsertOrUpdateCustomerDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(customerPayload),
      });

      if (!res1.ok) {
        throw new Error(`InsertOrUpdate failed: HTTP ${res1.status} ${res1.statusText}`);
      }

      // server returns a GUID (customerId)
      const customerId = await res1.json();

      // Prepare Quotation payload
      const quotationPayload = {
        Id: 0,
        CompanyId: companyId,
        CustomerId: customerId,
        ServiceId: serviceId,
        QuotationNo: generateQuotationNo(),
        RequirementDetails: requirementDetails,
        SupportingDocuments: null,
      };

      // AJAX call #2 => SendQuotationEmailToAdmin
      const res2 = await fetch(`${coolInvoiceApiUrl}/api/Service/SendQuotationEmailToAdmin`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(quotationPayload),
      });

      if (!res2.ok) {
        throw new Error(`SendQuotationEmailToAdmin failed: HTTP ${res2.status} ${res2.statusText}`);
      }

      // success
      const responseData = await res2.json();
      console.log("ContactUs email status", responseData);

      $("#formResponse").html(
        '<p class="text-success">Thank you for your Email. We will contact you as soon as possible.</p>'
      );
      $("#contactForm")[0].reset();
      $submitBtn.prop("disabled", false).text("Send Message");
    } catch (error) {
      console.error("Error in sendContactUsData:", error);
      // Friendly error message
      $("#formResponse").html(
        '<p class="text-danger">An error occurred while processing your request. Please try again later.</p>'
      );
      $submitBtn.prop("disabled", false).text("Send Message");
    }
  });
};




//==============Contact Us' Page API Requests End==================