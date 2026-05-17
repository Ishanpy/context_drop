export function createAnalytics({

  totalFiles = 0,

  totalFolders = 0,

  totalComponents = 0,

  riskScore = 0,

  architectureScore = 0,

}) {

  return {

    totalFiles,

    totalFolders,

    totalComponents,

    riskScore,

    architectureScore,

  };

}