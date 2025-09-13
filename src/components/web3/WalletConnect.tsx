import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWeb3 } from '@/hooks/useWeb3';
import { useTokenOperations } from '@/hooks/useContracts';
import { Wallet, Power, Copy, ExternalLink, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SUPPORTED_NETWORKS } from '@/contracts/abis';

export default function WalletConnect() {
  const { 
    account, 
    chainId, 
    isConnected, 
    isLoading, 
    connectWallet, 
    disconnectWallet,
    switchNetwork 
  } = useWeb3();
  
  const { getBalance } = useTokenOperations();
  const [balance, setBalance] = useState<string>('0');
  const [loadingBalance, setLoadingBalance] = useState(false);
  const { toast } = useToast();

  const currentNetwork = Object.values(SUPPORTED_NETWORKS).find(
    network => network.chainId === chainId
  );

  // Fetch balance when connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected && account) {
        setLoadingBalance(true);
        try {
          const bal = await getBalance(account);
          setBalance(bal);
        } catch (error) {
          console.error('Failed to fetch balance:', error);
          toast({
            title: "Error",
            description: "Failed to fetch token balance",
            variant: "destructive",
          });
        } finally {
          setLoadingBalance(false);
        }
      }
    };

    fetchBalance();
  }, [isConnected, account, getBalance, toast]);

  const copyAddress = () => {
    if (account) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(account);
        } else {
          // fallback
          const textArea = document.createElement("textarea");
          textArea.value = account;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          textArea.remove();
        }
        toast({
          title: "Address Copied",
          description: "Wallet address copied to clipboard",
        });
      } catch {
        toast({
          title: "Error",
          description: "Failed to copy address",
          variant: "destructive",
        });
      }
    }
  };

  const openInExplorer = () => {
    if (account && currentNetwork) {
      window.open(`${currentNetwork.blockExplorer}/address/${account}`, '_blank', "noopener,noreferrer");
    }
  };

  const handleSwitchNetwork = async (targetChainId: number) => {
    try {
      await switchNetwork(targetChainId);
    } catch (err) {
      console.error("Switch network error:", err);
      toast({
        title: "Network Error",
        description: "Failed to switch network. Please try manually in MetaMask.",
        variant: "destructive",
      });
    }
  };

  if (!isConnected) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-cyan p-3">
            <Wallet className="w-full h-full text-white" />
          </div>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your Web3 wallet to access IndoBlockCloud features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={connectWallet}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Wallet className="w-4 h-4 mr-2" />
            )}
            Connect MetaMask
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            Don't have MetaMask?{' '}
            <a 
              href="https://metamask.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyber-purple hover:underline"
            >
              Install here
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-cyan p-1">
                <Wallet className="w-full h-full text-white" />
              </div>
              Wallet Connected
            </CardTitle>
            <CardDescription>
              Your Web3 wallet is connected and ready
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnectWallet}
            className="text-destructive hover:text-destructive"
          >
            <Power className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Account Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Address</span>
            <div className="flex items-center gap-2">
              <code className="text-sm bg-muted px-2 py-1 rounded">
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </code>
              <Button variant="ghost" size="sm" onClick={copyAddress}>
                <Copy className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={openInExplorer}>
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Network</span>
            <Badge 
              variant={currentNetwork ? "default" : "destructive"}
              className={currentNetwork ? "bg-cyber-purple" : ""}
            >
              {currentNetwork?.name || `Chain ID: ${chainId}`}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">INDO Balance</span>
            <div className="flex items-center gap-2">
              {loadingBalance ? (
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin" /> Fetching...
                </span>
              ) : (
                <span className="font-mono text-sm">
                  {parseFloat(balance).toFixed(4)} INDO
                </span>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Network Switcher */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Supported Networks</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(SUPPORTED_NETWORKS).map((network) => (
              <Button
                key={network.chainId}
                variant={chainId === network.chainId ? "default" : "outline"}
                size="sm"
                onClick={() => handleSwitchNetwork(network.chainId)}
                className={chainId === network.chainId ? "bg-cyber-purple" : ""}
              >
                {network.name}
                {chainId === network.chainId && (
                  <Badge variant="secondary" className="ml-2">
                    Active
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
