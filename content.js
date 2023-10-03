
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const copyToClipboard = ( copyText ) => {
  navigator.clipboard.writeText(copyText).then(() => {
    //clipboard successfully set
    alert("Copied branch name: " + copyText);
  }, () => {
      //clipboard write failed, use fallback
  });

}


setTimeout(() => {
  const tiketTitle = document.querySelector(
    "*[data-testid='issue.views.issue-base.foundation.summary.heading']"
  );

  console.log({tiketTitle});

  let target = document.querySelector(
    "*[data-testid='create-button-wrapper']"
  );

  let ticket="";

  if (typeof window !== "undefined") {
    let url = window.location.href;
    let title = '';

    if (url.indexOf(".atlassian.net") > -1) {
      // check for Jira issue
      if ( url.indexOf("/browse/") > -1) {
        ticket =  url.split("browse/")[1];
      }
      if ( url.indexOf("selectedIssue=") > -1) {
        ticket =  url.split("selectedIssue=")[1];
      }
      let div = document.createElement("div");
      div.id = "brancher-content";
      target.appendChild(div);
      if (tiketTitle) {
        title = `feature/${ticket}-${slugify(tiketTitle.textContent)}`.toLocaleLowerCase();
        div.innerHTML = `<span id="branch-name-text" style="display:inline-block; user-select:all; background-color:#ccc; padding:5px; border-radius:5px;color: #000; margin-left: 20px;">${title}</span>`;
      }
    }
  }

  var branchNameText = document.querySelector('#branch-name-text');
  if(branchNameText) {
    branchNameText.addEventListener('click', function() {
      copyToClipboard(branchNameText.innerText);
    });
  }
},3000);
